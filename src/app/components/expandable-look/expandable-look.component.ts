import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expandable-look',
  templateUrl: './expandable-look.component.html',
})
export class ExpandableLookComponent {
  @Input() title: string = '';

  isExpanded: boolean = false;
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
