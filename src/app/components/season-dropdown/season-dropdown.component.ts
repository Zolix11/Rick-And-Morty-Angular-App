import { Component } from '@angular/core';
import { SeasonDataService } from 'src/app/services/season-data.service';
@Component({
  selector: 'app-season-dropdown',
  templateUrl: './season-dropdown.component.html',
})
export class SeasonDropdownComponent {
  selectedSeason: string = '';

  seasons: { label: string; value: string }[] = [
    { label: 'Season 1', value: 's01' },
    { label: 'Season 2', value: 's02' },
    { label: 'Season 3', value: 's03' },
    { label: 'Season 4', value: 's04' },
    { label: 'Season 5', value: 's05' },
  ];

  constructor(private seasonDataService: SeasonDataService) {
    this.selectedSeason = this.seasons[0].value;
  }

  onSelectSeason(seasonValue: string) {
    this.selectedSeason = seasonValue;
    this.seasonDataService.setSelectedSeason(seasonValue);
    this.callFunctionBasedOnSeason(seasonValue);
  }

  callFunctionBasedOnSeason(seasonValue: string) {
    // Perform actions based on the selected season
    console.log(`Selected season: ${seasonValue}`);
    // Call other functions or perform other logic here
  }
}
