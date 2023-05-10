import { LocationsPageComponent } from './app/components/pages/locations-page/locations-page.component';
import { CharactersPageComponent } from './app/components/pages/characters-page/characters-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './app/components/pages/home-page/home-page.component';
import { EpisodesPageComponent } from './app/components/pages/episodes-page/episodes-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'characters', component: CharactersPageComponent },
  { path: 'episodes', component: EpisodesPageComponent },
  { path: 'locations', component: LocationsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
