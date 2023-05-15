import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeasonDataService {
  private selectedSeasonSource = new BehaviorSubject<string>('s01');
  selectedSeason$ = this.selectedSeasonSource.asObservable();

   /**
   * Sets the selected season.
   * @param season The value representing the selected season.
   */
  setSelectedSeason(season: string) {
    this.selectedSeasonSource.next(season);
  }
}
