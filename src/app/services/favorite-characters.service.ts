import { Injectable } from '@angular/core';
import { Character } from 'rickmortyapi';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCharactersService {
  private storageKey = 'favoriteCharacters';
  private favoriteCharacters: Character[] = [];
  private removalSubject = new Subject<Character>();

  constructor() {
    this.loadFavorites();
  }

  addToFavorites(character: Character): void {
    if (!this.isCharacterFavorite(character)) {
      this.favoriteCharacters.push(character);
      this.saveFavorites();
    }
  }

  removeFromFavorites(character: Character): void {
    const index = this.favoriteCharacters.findIndex(c => c.id === character.id);
    if (index !== -1) {
      this.favoriteCharacters.splice(index, 1);
      this.saveFavorites();
      this.removalSubject.next(character); // Emit the removal event
    }
  }

  getFavorites(): Character[] {
    return this.favoriteCharacters;
  }

  isCharacterFavorite(character: Character): boolean {
    return this.favoriteCharacters.some(c => c.id === character.id);
  }

  getRemovalSubject(): Subject<Character> {
    return this.removalSubject;
  }

  private saveFavorites(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favoriteCharacters));
  }

  private loadFavorites(): void {
    const favoritesData = localStorage.getItem(this.storageKey);
    if (favoritesData) {
      this.favoriteCharacters = JSON.parse(favoritesData);
    }
  }
}
