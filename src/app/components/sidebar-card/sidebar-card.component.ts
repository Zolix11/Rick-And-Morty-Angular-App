import { Component, Input } from '@angular/core';
import { Character } from 'rickmortyapi';
import { FavoriteCharactersService } from 'src/app/services/favorite-characters.service';
@Component({
  selector: 'app-sidebar-card',
  templateUrl: './sidebar-card.component.html'
})
export class SidebarCardComponent {
  @Input() character: Character = {} as Character;

  constructor(private favoriresService: FavoriteCharactersService) {}
  
  removeFromFavorites() {
    this.favoriresService.removeFromFavorites(this.character);
  }
}
