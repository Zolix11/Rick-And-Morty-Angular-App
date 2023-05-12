import { Component } from '@angular/core';
import { ApiResponse, Info, getCharacters, Character } from 'rickmortyapi';

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
  async ngOnInit() {
    await this.fetchCharacters(this.currentPage);
    this.calculateVisiblePages(
      this.currentPage,
      this.totalPages,
      this.maxVisiblePages
    );
  }

  async fetchCharacters(page: number) {
    try {
      const response = await getCharacters({ page });
      this.characters = response.data.results || [];
      this.totalPages = response.data.info?.pages || 0;
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
      this.currentPage = 1;
      await this.fetchCharacters(this.currentPage);
    }
  }

  async fetchSearchCharacters(name: string, page: number) {
    const response = await getCharacters({
      name: name,
      page: page,
    });
    this.characters = response.data.results || [];
    this.totalPages = response.data.info?.pages || 0;
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
