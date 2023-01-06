import { Injectable } from '@angular/core';
import { Sensor, SensorData } from '../classes/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  humiditySensor: Sensor<number> = new Sensor("Feuchtigkeit (%)", "rgba(0,0,255,0.5)", d => d);
  temperatureSensor: Sensor<number> = new Sensor("Temperatur (grad)", "rgba(255,0,0,0.5)", d => d);
  pressureSensor: Sensor<number> = new Sensor("Luftdruck (hPa)", "rgba(0,255,0,0.5)", d => d);
  gpsSensor: Sensor<{"lat": number, "long": number, "alt": number}> = new Sensor("Höhe (m)", "rgba(0,255,255,0.5)", d => d.alt);

  lastSensorDate: Date = new Date(0);

}
