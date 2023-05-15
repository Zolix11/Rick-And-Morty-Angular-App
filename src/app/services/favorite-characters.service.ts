import { Injectable } from '@angular/core';
import { Character } from '../interfaces/interfaces';
import { Subject } from 'rxjs';

/**
 * Service for managing favorite characters.
 */
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

  /**
   * Adds a character to the list of favorite characters if it is not already in the list.
   * @param character The character to add to favorites.
   */
  addToFavorites(character: Character): void {
    if (!this.isCharacterFavorite(character)) {
      this.favoriteCharacters.push(character);
      this.saveFavorites();
    }
  }

  /**
   * Removes a character from the list of favorite characters.
   * @param character The character to remove from favorites.
   */
  removeFromFavorites(character: Character): void {
    const index = this.favoriteCharacters.findIndex(c => c.id === character.id);
    if (index !== -1) {
      this.favoriteCharacters.splice(index, 1);
      this.saveFavorites();
      this.removalSubject.next(character); // Emit the removal event
    }
  }

  /**
   * Returns an array of favorite characters.
   * @returns An array of favorite characters.
   */
  getFavorites(): Character[] {
    return this.favoriteCharacters;
  }

  /**
   * Checks if a character is in the list of favorite characters.
   * @param character The character to check.
   * @returns True if the character is in favorites, false otherwise.
   */
  isCharacterFavorite(character: Character): boolean {
    return this.favoriteCharacters.some(c => c.id === character.id);
  }

  /**
   * Returns the removal subject as an observable for subscribing to character removal events.
   * @returns The removal subject as an observable.
   */
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
