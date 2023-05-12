import { Component, Input, HostListener, OnInit } from '@angular/core';
import { Character } from 'rickmortyapi';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
})
export class CharacterGridComponent implements OnInit {
  @Input() characters: Character[] = [];
  @Input() homescreen: boolean = false;
  columns: number = 3;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateColumns();
  }

  constructor() {
    if (this.homescreen) {
      this.columns = 3;
    } else {
      this.columns = 5;
    }
    this.calculateColumns();
  }

  ngOnInit(): void {
    this.calculateColumns();
  }

  calculateColumns(): void {
    const screenWidth = window.innerWidth;

    if (this.homescreen) {
      if (screenWidth >= 1024) {
        this.columns = 3; // For large screens, display 3 columns
      } else if (screenWidth >= 768) {
        this.columns = 2; // For medium screens, display 2 columns
      } else {
        this.columns = 1; // For small screens, display 1 column
      }
    } else {
      if (screenWidth >= 1024) {
        this.columns = 5; // For large screens, display 3 columns
      } else if (screenWidth >= 768) {
        this.columns = 3; // For medium screens, display 2 columns
      } else {
        this.columns = 1; // For small screens, display 1 column
      }
    }
  }
}
