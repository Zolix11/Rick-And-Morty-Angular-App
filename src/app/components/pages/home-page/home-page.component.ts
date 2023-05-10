import { Component } from '@angular/core';
import { Character, getCharacter } from 'rickmortyapi';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  characters: Character[] = [];

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(): void {
    const randomCharacterIds = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 671) + 1
    );

    getCharacter(randomCharacterIds)
      .then((response) => {
        const results = response.data;
        this.characters = results || [];
        console.log(this.characters); // Handle the characters data as needed
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      });
  }
}
