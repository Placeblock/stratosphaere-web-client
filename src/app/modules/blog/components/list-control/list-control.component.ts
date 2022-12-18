import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-control',
  templateUrl: './list-control.component.html',
  styleUrls: ['./list-control.component.scss']
})
export class ListControlComponent {
  @Output('togglePublished') onTogglePublished = new EventEmitter<boolean>();
  @Output('toggleUnpublished') onToggleUnpublished = new EventEmitter<boolean>();

  constructor() { }

  togglePublished(event: any) {
    this.onTogglePublished.emit(event.target.checked);
  }

  toggleUnpublished(event: any) {
    this.onToggleUnpublished.emit(event.target.checked);
  }

}
