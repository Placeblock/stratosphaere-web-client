import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { SensorData } from 'src/app/classes/sensor';
import { SensorService } from 'src/app/services/sensor.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map: L.Map | null = null;

  private gpsSubscription: Subscription | null = null;

  constructor(private sensorService: SensorService) {}

  private initMap(): void {
    const center: L.LatLngTuple = [49.317556994144695, 11.02367652384287];

    const tiles: L.TileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.map = L.map('map', {
      center: center,
      zoom: 13
    })

    let polyline = L.polyline([], {color: 'red'}).addTo(this.map);
    
    this.gpsSubscription = this.sensorService.gpsSensor.$data.subscribe(data => {
      polyline.setLatLngs(this.extractLatLong(data));
    });

    L.rectangle([[49.31759300324013-16.384, 11.023805802303297-16.384],[49.31759300324013+16.384, 11.023805802303297+16.384]]).addTo(this.map);

    tiles.addTo(this.map);
  }

  extractLatLong(data: SensorData<{lat: number, long: number, alt: number}>[]): L.LatLngExpression[] {
    let latLongs: L.LatLngExpression[] = [];
    for (let i = 0; i < data.length; i++) {
      latLongs.push([data[i].value.lat, data[i].value.long]);
    }
    return latLongs;
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
  
  ngOnDestroy(): void {
    this.gpsSubscription?.unsubscribe();
  }
}
