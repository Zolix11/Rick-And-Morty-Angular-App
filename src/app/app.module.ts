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
import { CharacterCardProjectionComponent } from './components/character-card-projection/character-card-projection.component';

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
    CharacterCardProjectionComponent
  ],
  imports: [BrowserModule, AppRoutingModule,FormsModule],
  providers: [],
  bootstrap: [StarterPageComponent],
})
export class AppModule {}
