import { Component, HostBinding, OnDestroy } from '@angular/core';
import { exhaustMap, first, interval, Subscription } from 'rxjs';
import { LiveData, SensorData } from 'src/app/classes/sensor';
import { ApiService } from 'src/app/services/api.service';
import { SensorService } from 'src/app/services/sensor.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnDestroy {
  @HostBinding('class.earth-background') earth: boolean = true;
  @HostBinding('class.space-navbar') spaceNavbar: boolean = true;
  intervalSubscription: Subscription;

  constructor(public sensorService: SensorService, apiService: ApiService) {
    console.log("INIT");
    apiService.getLiveData(sensorService.lastSensorDate)
    .pipe(
      first()
    ).subscribe(result => {
      this.proccessData(result.data)
    });
    this.intervalSubscription = interval(20*1000).pipe(
      exhaustMap(() => {
        return apiService.getLiveData(sensorService.lastSensorDate);
      })
    ).subscribe(result => {
      this.proccessData(result.data);
    })
  }

  proccessData(datas: LiveData[]) {
    console.log(datas);
    let lastSensorDate = new Date(0);
    var gpsData: SensorData<{"lat": number, "long": number, "alt": number}>[] = [];
    var humidityData: SensorData<number>[] = [];
    var pressureData: SensorData<number>[] = [];
    var temperatureData: SensorData<number>[] = [];
    for(let i = 0; i < datas.length; i++) {
      let data = datas[i];
      let time = new Date(data.time);
      if (time > lastSensorDate) {
        lastSensorDate = time;
      }
      gpsData.push(new SensorData(time, {lat: data.latitude, long: data.longitude, alt: data.altitude}));
      humidityData.push(new SensorData(time, data.humidity));
      pressureData.push(new SensorData(time, data.pressure));
      temperatureData.push(new SensorData(time, data.temperature));
      this.sensorService.lastSensorDate = lastSensorDate;
    }
    this.sensorService.gpsSensor.addSensorData(gpsData);
    this.sensorService.humiditySensor.addSensorData(humidityData);
    this.sensorService.pressureSensor.addSensorData(pressureData);
    this.sensorService.temperatureSensor.addSensorData(temperatureData);
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
  
}
