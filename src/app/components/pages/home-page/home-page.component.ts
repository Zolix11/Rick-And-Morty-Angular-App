import { Component } from '@angular/core';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { Character } from 'src/app/interfaces/interfaces';

/**
 * Represents the home page component where 6 random character will show.
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  characters: Character[] = [];

  /**
   * Initializes the component and fetches characters.
   */
  ngOnInit() {
    this.fetchCharacters();
  }

  constructor(private rickAndMortyService: RickAndMortyService) {}

  /**
   * Fetches characters from the API.
   */
  fetchCharacters(): void {
    // Generate an array of random character IDs
    const randomCharacterIds = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 671) + 1
    );

    this.rickAndMortyService.getMultipleCharacters(randomCharacterIds).then(
      (response) => {
        if (response && response.data) {
          this.characters = response.data;
          console.log(this.characters); // Handle the characters data as needed
        } else {
          console.error('Invalid API response:', response);
        }
      },
      (error) => {
        console.error('Error fetching characters:', error);
      }
    );
  }
}