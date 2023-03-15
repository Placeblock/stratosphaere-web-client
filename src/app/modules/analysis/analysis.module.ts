import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { DataChartComponent } from './components/data-chart/data-chart.component';


@NgModule({
  declarations: [
    AnalysisComponent,
    DataChartComponent
  ],
  imports: [
    CommonModule,
    AnalysisRoutingModule,
    NgChartsModule
  ]
})
export class AnalysisModule { }
