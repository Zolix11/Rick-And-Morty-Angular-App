import { Component, EventEmitter, Output , Input} from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html'
})
export class ModalDialogComponent {
  @Output() closeModalEvent = new EventEmitter();
  @Input() title: string='Dialog';
  @Input() content: string='';
  closeModal() {
    this.closeModalEvent.emit();
  }
}
