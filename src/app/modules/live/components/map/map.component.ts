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

  constructor(public sensorService: SensorService) {}

  private initMap(): void {
    const sensService = this.sensorService;
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

    var btn = L.DomUtil.create('button');
    btn.classList.add("zoomtrack");
    btn.style.backgroundImage = "url('../../../../../assets/mapzoomtrack.png')"

    const ZoomTrack = L.Control.extend({
      onAdd: function(map: L.Map) {
        L.DomEvent.on(btn, "click", () => {this.zoomTrack(map)}, this);
        return btn;
      },
      onRemove: function(map: L.Map) {
        L.DomEvent.off(btn, "click", () => {this.zoomTrack(map)}, this);
      },
      zoomTrack: function(map: L.Map) {
        var maxLong: number = -10;
        var minLong: number = 1000;
        var maxLat: number = -10;
        var minLat: number = 1000;
        for (let data of sensService.gpsSensor.data) {
          maxLong = Math.max(data.value.long, maxLong);
          minLong = Math.min(data.value.long, minLong);
          maxLat = Math.max(data.value.lat, maxLat);
          minLat = Math.min(data.value.lat, minLat);
        }
        map.fitBounds([[minLat, minLong], [maxLat, maxLong]]);
        console.log("press");
      }
    });

    const zoomTrack = (opts: L.ControlOptions | undefined) => new ZoomTrack(opts);
    zoomTrack({position: 'topleft'}).addTo(this.map);

    let polyline = L.polyline([], {color: 'red'}).addTo(this.map);
    
    this.gpsSubscription = this.sensorService.gpsSensor.$data.subscribe(data => {
      polyline.setLatLngs(this.extractLatLong(data));
    });
    
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
