import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CharacterCardComponent } from './components/character-card-home-look/character-card.component';
import { CharacterGridComponent } from './components/character-grid/character-grid.component';
import { CharactersPageComponent } from './components/pages/characters-page/characters-page.component';
import { LocationsPageComponent } from './components/pages/locations-page/locations-page.component';
import { EpisodesPageComponent } from './components/pages/episodes-page/episodes-page.component';
import { StarterPageComponent } from './components/pages/starter-page-navbar-pages/starter-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { RangePipe } from './pipes/range.pipe';
import { CharacterCardCharactersPageComponent } from './components/character-card-characters-page/character-card-characters-page.component';
import { EpisodeGridComponent } from './components/episode-grid/episode-grid.component';
import { SeasonDropdownComponent } from './components/season-dropdown/season-dropdown.component';
import { SeasonDataService } from './services/season-data.service';
import { ExpandableLookComponent } from './components/expandable-look/expandable-look.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { FavoriteCharactersService } from './services/favorite-characters.service';
import { SidebarFavoritesComponent } from './components/sidebar-favorites/sidebar-favorites.component';
import { SidebarCardComponent } from './components/sidebar-card/sidebar-card.component';
import { SidebarStateService } from './services/sidebar-state.service';
import { RickAndMortyService } from './services/rick-and-morty.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NavbarComponent,
    CharacterCardComponent,
    CharacterGridComponent,
    CharactersPageComponent,
    LocationsPageComponent,
    EpisodesPageComponent,
    StarterPageComponent,
    HomePageComponent,
    RangePipe,
    CharacterCardCharactersPageComponent,
    EpisodeGridComponent,
    SeasonDropdownComponent,
    ExpandableLookComponent,
    ModalDialogComponent,
    SidebarFavoritesComponent,
    SidebarCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    SeasonDataService,
    FavoriteCharactersService,
    SidebarStateService,
    RickAndMortyService,
  ],
  bootstrap: [StarterPageComponent],
})
export class AppModule {}
