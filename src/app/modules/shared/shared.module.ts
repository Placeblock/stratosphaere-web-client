import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    PageWrapperComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    CommonModule, PageWrapperComponent, FontAwesomeModule, ModalComponent
  ]
})
export class SharedModule { }
