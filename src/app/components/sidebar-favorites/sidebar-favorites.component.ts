import { Component, OnInit } from '@angular/core';
import { FavoriteCharactersService } from 'src/app/services/favorite-characters.service';
import { Character } from 'src/app/interfaces/interfaces';
import { SidebarStateService } from 'src/app/services/sidebar-state.service';

/**
 * Component representing the favorites section in the sidebar.
 */
@Component({
  selector: 'app-sidebar-favorites',
  templateUrl: './sidebar-favorites.component.html',
})
export class SidebarFavoritesComponent implements OnInit {
  /** Indicates whether the sidebar is open or closed. */
  isSidebarOpen = false;

  /** Array of favorite characters. */
  favoriteCharacters: Character[] = [];

  /**
   * Constructor of the SidebarFavoritesComponent.
   * @param favoritesCharacterService The FavoriteCharactersService for managing favorite characters.
   * @param sidebarService The SidebarStateService for managing the sidebar state.
   */
  constructor(
    private favoritesCharacterService: FavoriteCharactersService,
    private sidebarService: SidebarStateService
  ) {}

  /**
   * Initializes the component and subscribes to the sidebar state changes.
   */
  ngOnInit(): void {
    this.favoriteCharacters = this.favoritesCharacterService.getFavorites();

    // Subscribe to the sidebar state changes
    this.sidebarService.sidebarStateChange.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
      // Perform any necessary actions based on the sidebar state
    });
  }

  /**
   * Closes the sidebar by toggling the sidebar state.
   */
  closeSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
