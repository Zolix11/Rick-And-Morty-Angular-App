import { Component, OnInit } from '@angular/core';
import { ApiResponse, Location, Character } from 'src/app/interfaces/interfaces';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { OnScreenLocations } from 'src/app/interfaces/customenterfaces';

/**
 * Represents the locations page.
 */
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

  constructor(private rickAndMortyService: RickAndMortyService) {}

  /**
   * Initializes the component and fetches locations.
   */
  async ngOnInit() {
    await this.fetchLocations(this.currentPage);
    this.goToPage(this.currentPage);
  }

  /**
   * Opens the modal with the specified text content.
   * @param modalText The text content of the modal.
   */
  openModal(modalText: string) {
    this.content = modalText;
    this.showModal = true;
  }

  /**
   * Closes the modal.
   */
  closeModal() {
    this.showModal = false;
  }

  /**
   * Fetches locations from the API.
   * @param page The page number to fetch.
   */
  async fetchLocations(page: number) {
    await this.rickAndMortyService.getLocations(page).then((response) => {
      this.locations = response.data.results || [];
      this.totalPages = response.data.info?.pages!;
    });
  }

  /**
   * Extracts the ID from the given URL.
   * @param url The URL to extract the ID from.
   * @returns The extracted ID.
   */
  getUserId(url: string): number {
    const id = parseInt(url.split('/').pop()!, 10);
    console.log('ID:' + url);
    console.log('ID:' + id);
    return id;
  }

  /**
   * Retrieves characters based on the given image URLs.
   * @param characters The array of image URLs representing characters.
   * @returns A Promise that resolves to an array of characters.
   */
  async getCharactersFromStringArray(characters: string[]): Promise<Character[]> {
    const characterIds = characters.map((image: string) => this.getUserId(image));
    const characterPromises = characterIds.map((characterId: number) =>
      this.rickAndMortyService.getCharacter(characterId)
    );
    const characterResults = await Promise.all(characterPromises);
    const newCharacters: Character[] = [];
    characterResults.forEach((character: ApiResponse<Character>) => {
      newCharacters.push(character.data);
    });
    return newCharacters;
  }

  /**
   * Handles the page navigation.
   * @param page The page number to navigate to.
   */
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

  /**
   * Calculates the range of visible pages based on the current page and total pages.
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

