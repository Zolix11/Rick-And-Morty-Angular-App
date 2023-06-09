import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/interfaces';
import { FavoriteCharactersService } from 'src/app/services/favorite-characters.service';

@Component({
  selector: 'app-character-card-characters-page',
  templateUrl: './character-card-characters-page.component.html',
})
export class CharacterCardCharactersPageComponent implements OnInit {
  @Input() character: Character = {} as Character;
  liked: boolean = false;
  constructor(private favoriresService: FavoriteCharactersService) {}
  ngOnInit() {
    this.checkIfLiked();
    this.favoriresService
      .getRemovalSubject()
      .subscribe((removedCharacter: Character) => {
        if (removedCharacter.id === this.character.id) {
          this.liked = false;
          console.log("Removing",this.liked);

        }
      });
  }

  toggleLiked() {
    if (this.liked) {
      this.favoriresService.removeFromFavorites(this.character);
    } else {
      this.favoriresService.addToFavorites(this.character);
      this.liked = !this.liked;
      console.log("Add",this.liked);
    }
  }

  checkIfLiked() {
    this.liked = this.favoriresService.isCharacterFavorite(this.character);
  }
}
