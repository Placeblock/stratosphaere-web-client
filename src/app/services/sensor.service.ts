import { Injectable } from '@angular/core';
import { Sensor } from '../classes/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  humiditySensor: Sensor<number> = new Sensor("Feuchtigkeit", "rgba(0,0,255,0.5)", d => d);
  temperatureSensor: Sensor<number> = new Sensor("Temperatur", "rgba(255,0,0,0.5)", d => d);
  pressureSensor: Sensor<number> = new Sensor("Luftdruck", "rgba(0,255,0,0.5)", d => d);
  gpsSensor: Sensor<{"lat": number, "long": number, "alt": number}> = new Sensor("Höhe", "rgba(0,255,255,0.5)", d => d.alt);

  lastSensorDate: Date = new Date(0);

}
