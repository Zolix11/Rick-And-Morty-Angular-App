import { Component , Input} from '@angular/core';
import { Character, getCharacters, getCharacter } from 'rickmortyapi';

@Component({
  selector: 'app-character-card-characters-page',
  templateUrl: './character-card-characters-page.component.html',
})
export class CharacterCardCharactersPageComponent {
  @Input() character: Character = {} as Character;
}
