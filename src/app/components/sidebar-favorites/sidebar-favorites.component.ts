import { Component, OnInit} from '@angular/core';
import { FavoriteCharactersService } from 'src/app/services/favorite-characters.service';
import { Character } from 'rickmortyapi';
import { SidebarStateService } from 'src/app/services/sidebar-state.service';
@Component({
  selector: 'app-sidebar-favorites',
  templateUrl: './sidebar-favorites.component.html',
})
export class SidebarFavoritesComponent implements OnInit {
  isSidebarOpen = false;
  favoriteCharacters: Character[] = [];

  constructor(private favoritesCharacterService: FavoriteCharactersService, private sidebarService: SidebarStateService) {
    sidebarService.sidebarStateChange
  }

  ngOnInit(): void {
    this.favoriteCharacters = this.favoritesCharacterService.getFavorites();
    this.sidebarService.sidebarStateChange.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
      // Perform any necessary actions based on the sidebar state
    });
  }

  closeSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
