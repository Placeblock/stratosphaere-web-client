import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-aftermath-modal',
  templateUrl: './aftermath-modal.component.html',
  styleUrls: ['./aftermath-modal.component.scss']
})
export class AftermathModalComponent {
  @Input("title") title: string = "";
  @Input("button") button: string = "";
  @Output("confirm") confirmEmitter: EventEmitter<void> = new EventEmitter();
  @Output("close") closeEmitter: EventEmitter<void> = new EventEmitter();

  afterMathForm: FormControl = new FormControl(false);

  click() {
    if (this.afterMathForm.value) {
      this.confirmEmitter.emit();
      this.closeEmitter.emit();
    }
  }

  close() {
    this.afterMathForm.setValue(false);
    this.closeEmitter.emit();
  }
  
}
