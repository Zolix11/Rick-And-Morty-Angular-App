import { Component } from '@angular/core';
import { Character } from 'src/app/interfaces/interfaces';
import { FavoriteCharactersService } from 'src/app/services/favorite-characters.service';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

/**
 * Represents the Characters Page component.
 */
@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
})
export class CharactersPageComponent {
  /**
   * The array of characters.
   */
  characters: Character[] = [];

  /**
   * The current page number.
   */
  currentPage: number = 1;

  /**
   * The total number of pages.
   */
  totalPages: number = 0;

  /**
   * The search name used for filtering characters.
   */
  searchName: string = '';

  /**
   * The array of visible page numbers.
   */
  visiblePages: number[] = [];

  /**
   * The state of the search mode.
   */
  searchState: boolean = false;

  /**
   * The maximum number of visible pages.
   * Replace with the desired maximum number of visible pages.
   */
  maxVisiblePages = 5;

  /**
   * Constructs the CharactersPageComponent.
   * @param favoritesCharacterService The service for managing favorite characters.
   * @param rickAndMortyService The service for fetching characters.
   */
  constructor(
    private favoritesCharacterService: FavoriteCharactersService,
    private rickAndMortyService: RickAndMortyService
  ) {}

  /**
   * Initializes the component.
   */
  async ngOnInit() {
    await this.fetchCharacters(this.currentPage);
    this.calculateVisiblePages(
      this.currentPage,
      this.totalPages,
      this.maxVisiblePages
    );
  }

  /**
   * Adds a character to the favorites.
   * @param character The character to add to favorites.
   */
  addToFavorites(character: Character): void {
    this.favoritesCharacterService.addToFavorites(character);
  }

  /**
   * Removes a character from the favorites.
   * @param character The character to remove from favorites.
   */
  removeFromFavorites(character: Character): void {
    this.favoritesCharacterService.removeFromFavorites(character);
  }

  /**
   * Fetches characters for the specified page.
   * @param page The page number.
   */
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

  /**
   * Searches characters based on the entered name.
   */
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

  /**
   * Fetches characters for the specified page based on the search name.
   * @param name The name used for filtering characters.
   * @param page The page number.
   */
  async fetchSearchCharacters(name: string, page: number) {
    await this.rickAndMortyService
      .getCharacters(page, name)
      .then((response) => {
        this.characters = response.data.results || [];
        this.totalPages = response.data.info?.pages!;
      });
  }

  /**
 * Navigates to the specified page.
 * @param page The page number to navigate to.
 */
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

/**
 * Calculates the range of visible pages.
 * @param currentPage The current page number.
 * @param totalPages The total number of pages.
 * @param maxVisiblePages The maximum number of visible pages.
 */
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
