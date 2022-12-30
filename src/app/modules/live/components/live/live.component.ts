import { Component, HostBinding } from '@angular/core';
import { Sensor, SensorData } from 'src/app/classes/sensor';
import { SensorService } from 'src/app/services/sensor.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent {
  @HostBinding('class.earth-background') earth: boolean = true;

  constructor(public sensorService: SensorService, webSocketService: WebsocketService) {
    webSocketService.connect();
  }
  
}
