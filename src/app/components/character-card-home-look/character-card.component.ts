import { Component, Input } from '@angular/core';
import { Character, getCharacters, getCharacter } from 'rickmortyapi';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html'
})
export class CharacterCardComponent {
  @Input() character: Character = {} as Character;
}
