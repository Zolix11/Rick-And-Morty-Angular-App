import { Component, Input } from '@angular/core';
import { Character } from 'rickmortyapi';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html'
})
export class CharacterGridComponent {
  @Input() characters: Character[] = [];
}
