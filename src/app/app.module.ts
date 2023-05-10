import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterGridComponent } from './components/character-grid/character-grid.component';
import { CharactersPageComponent } from './components/pages/characters-page/characters-page.component';
import { LocationsPageComponent } from './components/pages/locations-page/locations-page.component';
import { EpisodesPageComponent } from './components/pages/episodes-page/episodes-page.component';
import { StarterPageComponent } from './components/pages/starter-page-navbar-pages/starter-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [StarterPageComponent],
})
export class AppModule {}
