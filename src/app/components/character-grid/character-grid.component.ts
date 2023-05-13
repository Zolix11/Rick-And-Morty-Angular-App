import { Component, Input, HostListener, OnInit } from '@angular/core';
import { Character } from 'rickmortyapi';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
})
export class CharacterGridComponent implements OnInit {
  @Input() homescreen: boolean = false;
  columns: number = 3;

  ngOnInit(): void {
    if (this.homescreen) {
      this.columns = 3;
    } else {
      this.columns = 4;
    }
  }
}
