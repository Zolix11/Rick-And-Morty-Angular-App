import { Component } from '@angular/core';
import { SeasonDataService } from 'src/app/services/season-data.service';

/**
 * Component representing a dropdown for selecting a season.
 */
@Component({
  selector: 'app-season-dropdown',
  templateUrl: './season-dropdown.component.html',
})
export class SeasonDropdownComponent {
  /** The currently selected season value. */
  selectedSeason: string = '';

  /** The placeholder text to display in the dropdown when no season is selected. */
  placeHolder: string = '-- Select --';

  /** Array of available seasons to populate the dropdown options. */
  seasons: { label: string; value: string }[] = [
    { label: 'Season 1', value: 's01' },
    { label: 'Season 2', value: 's02' },
    { label: 'Season 3', value: 's03' },
    { label: 'Season 4', value: 's04' },
    { label: 'Season 5', value: 's05' },
  ];

  /**
   * Constructor of the SeasonDropdownComponent.
   * @param seasonDataService The SeasonDataService for managing the selected season.
   */
  constructor(private seasonDataService: SeasonDataService) {
    // Set the selected season to the first value in the seasons array by default.
    this.selectedSeason = this.seasons[0].value;
  }

  /**
   * Event handler for when a season is selected from the dropdown.
   * @param seasonValue The value of the selected season.
   */
  onSelectSeason(seasonValue: string) {
    // Update the selected season value.
    this.selectedSeason = seasonValue;

    // Update the selected season in the SeasonDataService.
    this.seasonDataService.setSelectedSeason(seasonValue);
  }
}
