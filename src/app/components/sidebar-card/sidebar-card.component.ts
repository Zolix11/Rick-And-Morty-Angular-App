import { Component, Input } from '@angular/core';
import { Character } from './../../interfaces/interfaces';
import { FavoriteCharactersService } from 'src/app/services/favorite-characters.service';

/**
 * Component representing a card in the sidebar displaying information about a character.
 */
@Component({
  selector: 'app-sidebar-card',
  templateUrl: './sidebar-card.component.html'
})
export class SidebarCardComponent {
  /** The character object to display information for. */
  @Input() character: Character = {} as Character;

  /**
   * Constructor of the SidebarCardComponent.
   * @param favoritesService The FavoriteCharactersService for managing favorite characters.
   */
  constructor(private favoritesService: FavoriteCharactersService) {}

  /**
   * Removes the character from the list of favorite characters.
   */
  removeFromFavorites() {
    this.favoritesService.removeFromFavorites(this.character);
  }
}
