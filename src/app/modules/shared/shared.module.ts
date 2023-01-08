import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import { AftermathModalComponent } from './components/aftermath-modal/aftermath-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PageWrapperComponent,
    ModalComponent,
    AftermathModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule, PageWrapperComponent, FontAwesomeModule, ModalComponent, AftermathModalComponent, ReactiveFormsModule
  ]
})
export class SharedModule { }
