import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeasonDataService {
  private selectedSeasonSource = new BehaviorSubject<string>('s01');
  selectedSeason$ = this.selectedSeasonSource.asObservable();

  setSelectedSeason(season: string) {
    this.selectedSeasonSource.next(season);
  }
}
