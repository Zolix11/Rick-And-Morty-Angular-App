import { Component, OnInit } from '@angular/core';
import { SeasonDataService } from 'src/app/services/season-data.service';
import {
  Episode,
  getEpisodes,
  getCharacter,
  Character,
  ApiResponse,
} from 'rickmortyapi';

@Component({
  selector: 'app-episodes-page',
  templateUrl: './episodes-page.component.html',
})
export class EpisodesPageComponent implements OnInit {
  searchText: string = '';
  onScreenEpisodes: OnScreenEpisode[] = [];
  allEpisodes: Episode[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  episodesPerPage: number = 4;
  visiblePages: number[] = [];
  searchState: boolean = false;
  maxVisiblePages = 5;
  showModal = false;
  content: string = '';
  openModal(modalText: string) {
    this.content = modalText;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  constructor(private seasonDataService: SeasonDataService) {}

  async ngOnInit() {
    this.seasonDataService.selectedSeason$.subscribe(
      async (selectedSeason: string) => {
        this.currentPage = 1;
        console.log('Selected season callback', selectedSeason);
        await (async () => {
          await this.fetchEpisodes(selectedSeason);
          // Additional asynchronous code if needed
          this.goToPage(this.currentPage);
        })();
      }
    );
  }

  searchForEpisodeName() {
    if (this.searchText.length != 0) {
      this.fetchEpisodeWithName();
    } else {
      this.openModal('Please specify an episode code!');
    }
  }

  async fetchEpisodeWithName() {
    const response = await getEpisodes({
      episode: this.searchText,
    });
    this.allEpisodes = response.data.results || [];
    this.totalPages = Math.ceil(
      response.data.results?.length! / this.episodesPerPage
    );
    if (this.allEpisodes.length == 0) {
      this.openModal('No luck today');
    }
    console.log('Response', this.allEpisodes);
    this.currentPage = 1;
    this.goToPage(this.currentPage);
  }
  async fetchEpisodes(selectedSeason: string) {
    try {
      const response = await getEpisodes({ episode: selectedSeason });
      this.allEpisodes = response.data.results || [];
      this.totalPages = Math.ceil(
        response.data.results?.length! / this.episodesPerPage
      );
      console.log('totalpages:' + this.totalPages);
      console.log('total episodes' + this.allEpisodes.length);

      console.log('totalpages:' + this.totalPages);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    }
  }

  getUserId(url: string): number {
    const id = parseInt(url.split('/').pop()!, 10);
    console.log('ID:' + url);
    console.log('ID:' + id);
    return id;
  }

  async getCharactersFromStringArray(
    characters: string[]
  ): Promise<Character[]> {
    const characterIds = characters.map((url: string) => this.getUserId(url));
    const characterPromises = characterIds.map((characterId: number) =>
      getCharacter(characterId)
    );
    const characterResults = await Promise.all(characterPromises);
    const newCharacters: Character[] = [];
    characterResults.forEach((character: ApiResponse<Character>) => {
      newCharacters.push(character.data);
    });
    return newCharacters;
  }

  async goToPage(page: number) {
    console.log('State:' + this.searchState);
    console.log('State:' + this.currentPage);
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      const start = this.episodesPerPage * (this.currentPage - 1);
      const end = start + this.episodesPerPage;
      this.onScreenEpisodes.splice(0);
      this.allEpisodes.slice(start, end).forEach(async (episode: Episode) => {
        const charachters = await this.getCharactersFromStringArray(
          episode.characters
        );
        const newEpisode: OnScreenEpisode = {
          id: episode.id,
          name: episode.name,
          air_date: episode.air_date,
          episode: episode.episode,
          characters: charachters,
          url: episode.url,
          created: episode.created,
        };
        this.onScreenEpisodes.push(newEpisode);
        this.calculateVisiblePages(
          this.currentPage,
          this.totalPages,
          this.maxVisiblePages
        );
      });
    }
  }
  calculateVisiblePages(
    currentPage: number,
    totalPages: number,
    maxVisiblePages: number
  ): void {
    const halfRange = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfRange, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    // Adjust the range if the end page exceeds the total pages
    if (endPage - startPage + 1 < maxVisiblePages) {
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    this.visiblePages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }
}

interface OnScreenEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
  url: string;
  created: string;
}
