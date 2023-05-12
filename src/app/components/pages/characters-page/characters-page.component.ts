import { Component } from '@angular/core';
import { getCharacters, Character } from 'rickmortyapi';

@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html'
})
export class CharactersPageComponent {
  characters: Character[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  searchName: string = '';

  async ngOnInit() {
    await this.fetchCharacters();
  }

  async fetchCharacters(page: number = 1) {
    try {
      const response = await getCharacters({page});
      this.characters = response.data.results || [];
      this.totalPages = response.data.info?.pages || 0;
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  }

  async searchCharacters() {
    await this.fetchCharacters(this.currentPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchCharacters(this.currentPage);
    }
  }
}
