import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { Sensor } from 'src/app/classes/sensor';
import 'chartjs-adapter-date-fns'
import { de } from 'date-fns/locale';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart') private chartRef!: ElementRef;
  @Input("sensor") sensor: Sensor<any> = new Sensor<number>("Label", "black", d => d);

  private chart: Chart | null = null;

  private sensorSubscription: Subscription | undefined = undefined;

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        datasets: [{
          label: this.sensor.name,
          data: [],
          backgroundColor: this.sensor.color,
          borderColor: "black",
          borderWidth: 2,
          fill: {value: -200},
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
          pointBorderColor: "transparent",
          pointBackgroundColor: "transparent",
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              tooltipFormat:'hh:mm:ss',
              displayFormats: {
                millisecond: 'hh:mm:ss',
                second: 'hh:mm:ss',
                minute: 'hh:mm:ss',
                hour: "E h'h'",
                day: "d.M.y"
              }
            },
            adapters: {
              date: {
                  locale: de
              }
            }
          }
        }
      }
    });
    this.sensorSubscription = this.sensor?.$data.subscribe(data => {
      if (this.chart == null) return;
      this.chart.data.datasets[0].data = this.sensor.parsePoints();
      this.chart?.update();
    });
  }

  ngOnDestroy(): void {
    this.sensorSubscription?.unsubscribe();
  }
}
