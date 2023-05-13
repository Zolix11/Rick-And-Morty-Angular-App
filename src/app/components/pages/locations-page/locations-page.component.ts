import { Component, OnInit } from '@angular/core';
import {
  Location,
  getLocations,
  Character,
  getCharacter,
  ApiResponse,
} from 'rickmortyapi';
@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
})
export class LocationsPageComponent implements OnInit {
  locations: Location[] = [];
  onScreenLocations: OnScreenLocations[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  visiblePages: number[] = [];
  maxVisiblePages = 5;
  showModal = false;
  content: string = '';
  async ngOnInit() {
    await this.fetchLocations(this.currentPage);
    this.goToPage(this.currentPage);
  }
  openModal(modalText: string) {
    this.content = modalText;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async fetchLocations(page: number) {
    try {
      const response = await getLocations({
        page: page,
      });
      this.locations = response.data.results || [];
      this.totalPages = response.data.info?.pages!;
      console.log('Locations', this.locations);
    } catch (error) {
      console.error('Error fetching locations:', error);
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
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      await this.fetchLocations(this.currentPage);
      this.onScreenLocations.splice(0);
      this.locations.forEach(async (location: Location) => {
        const charachters = await this.getCharactersFromStringArray(
          location.residents
        );
        const newEpisode: OnScreenLocations = {
          id: location.id,
          name: location.name,
          type: location.type,
          dimension: location.dimension,
          residents: charachters,
          url: location.url,
          created: location.created,
        };
        this.onScreenLocations.push(newEpisode);
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
interface OnScreenLocations {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Character[];
  url: string;
  created: string;
}
