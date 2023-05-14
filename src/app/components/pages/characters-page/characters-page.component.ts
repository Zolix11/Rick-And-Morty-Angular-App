import { Component } from '@angular/core';
import { Character } from 'src/app/interfaces/interfaces';
import { FavoriteCharactersService } from 'src/app/services/favorite-characters.service';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
})
export class CharactersPageComponent {
  characters: Character[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  searchName: string = '';
  visiblePages: number[] = [];
  searchState: boolean = false;
  maxVisiblePages = 5; // Replace with the maximum number of visible pages you want
  constructor(
    private favoritesCharacterService: FavoriteCharactersService,
    private rickAndMortyService: RickAndMortyService
  ) {}

  async ngOnInit() {
    await this.fetchCharacters(this.currentPage);
    this.calculateVisiblePages(
      this.currentPage,
      this.totalPages,
      this.maxVisiblePages
    );
  }

  addToFavorites(character: Character): void {
    this.favoritesCharacterService.addToFavorites(character);
  }

  removeFromFavorites(character: Character): void {
    this.favoritesCharacterService.removeFromFavorites(character);
  }

  async fetchCharacters(page: number) {
    try {
      await this.rickAndMortyService
        .getCharacters(page, undefined)
        .then((response) => {
          console.log(response);
          this.characters = response.data.results || [];
          this.totalPages = response.data.info?.pages!;
        });
      console.log('totalpages:' + this.totalPages);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  }

  async searchCharacters() {
    if (this.searchName.length != 0) {
      this.searchState = true;
      this.currentPage = 1;
      this.fetchSearchCharacters(this.searchName, this.currentPage);

      this.calculateVisiblePages(
        this.currentPage,
        this.totalPages,
        this.maxVisiblePages
      );
    } else {
      this.searchState = false;
      this.currentPage = 1;
      await this.fetchCharacters(this.currentPage);
    }
  }

  async fetchSearchCharacters(name: string, page: number) {
    await this.rickAndMortyService
      .getCharacters(page, name)
      .then((response) => {
        this.characters = response.data.results || [];
        this.totalPages = response.data.info?.pages!;
      });
  }

  goToPage(page: number) {
    console.log('State:' + this.searchState);
    console.log('State:' + this.currentPage);
    if (this.searchState) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        console.log('State:' + this.currentPage);
        this.fetchSearchCharacters(this.searchName, this.currentPage);
        this.calculateVisiblePages(
          this.currentPage,
          this.totalPages,
          this.maxVisiblePages
        );
      }
    } else {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchCharacters(this.currentPage);
        this.calculateVisiblePages(
          this.currentPage,
          this.totalPages,
          this.maxVisiblePages
        );
      }
    }
  }
  // Function to calculate the range of visible pages
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
