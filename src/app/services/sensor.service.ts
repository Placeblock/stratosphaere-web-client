import { Injectable } from '@angular/core';
import { Sensor, SensorData } from '../classes/sensor';
import { SensorsMessage } from '../classes/wsmessage';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  humiditySensor: Sensor<number> = new Sensor("Feuchtigkeit", "rgba(0,0,255,0.5)", d => d);
  temperatureSensor: Sensor<number> = new Sensor("Temperatur", "rgba(255,0,0,0.5)", d => d);
  pressureSensor: Sensor<number> = new Sensor("Luftdruck", "rgba(0,255,0,0.5)", d => d);
  gpsSensor: Sensor<{"lat": number, "long": number, "alt": number}> = new Sensor("Höhe", "rgba(0,255,255,0.5)", d => d.alt);

  constructor(websocketService: WebsocketService) {
    websocketService.messages$.subscribe(message => {
      if (message == null) return;
      switch (message.action) {
        case "sensors":
          let sensorsMessage = SensorsMessage.deserialize(message.data);
          for (let i = 0; i < sensorsMessage.data.length; i++) {
            let sensorData = sensorsMessage.data[i];
            let sensor = this.getSensor(sensorData.sensor);
            if (sensor == null) return;
            for (let j = 0; j < sensorData.values.length; j++) {
              let dataValue = sensorData.values[j];
              sensor.addSensorData(new SensorData(new Date(dataValue.time), dataValue.value));
            }
          }
          break;
        default:
          break;
      }
      console.log(message)
    });
  }

  getSensor(name: any): Sensor<any> | null {
    switch (name) {
      case "humidity":
        return this.humiditySensor
      case "temperature":
        return this.temperatureSensor
      case "pressure":
        return this.pressureSensor
      default:
        return null;
    }
  }
}
