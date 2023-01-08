import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsComponent } from './tools.component';
import { SharedModule } from '../shared/shared.module';
import { ValtorawComponent } from './components/valtoraw/valtoraw.component';
import { RawtovalComponent } from './components/rawtoval/rawtoval.component';


@NgModule({
  declarations: [
    ToolsComponent,
    ValtorawComponent,
    RawtovalComponent
  ],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    SharedModule
  ]
})
export class ToolsModule { }
