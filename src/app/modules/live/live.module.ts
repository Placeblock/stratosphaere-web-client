import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveRoutingModule } from './live-routing.module';
import { LiveComponent } from './components/live/live.component';
import { MapComponent } from './components/map/map.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    LiveComponent,
    MapComponent,
    SensorComponent
  ],
  imports: [
    CommonModule,
    LiveRoutingModule,
    NgChartsModule
  ]
})
export class LiveModule { }
