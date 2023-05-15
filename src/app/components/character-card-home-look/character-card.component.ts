import { Component, Input } from '@angular/core';
import { ApiResponse, Location, Info, Character, Episode } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html'
})
export class CharacterCardComponent {
  @Input() character: Character = {} as Character;
}
