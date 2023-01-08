import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rawtoval',
  templateUrl: './rawtoval.component.html',
  styleUrls: ['./rawtoval.component.scss']
})
export class RawtovalComponent implements OnDestroy {

  latitude: number = 0;
  longitude: number = 0;
  altitude: number = 0;
  temperature: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  hexControl: FormControl = new FormControl("0000000000000000", {nonNullable: true});

  formUpdateSubscription: Subscription;

  constructor() {
    this.formUpdateSubscription = this.hexControl.valueChanges.subscribe(value => {
      const bytes: number[] = this.hexToBytes(value);
      const values = this.getValuesFromByteArray(bytes);
      this.latitude = values.latitude;
      this.longitude = values.longitude;
      this.altitude = values.altitude;
      this.temperature = values.temperature;
      this.pressure = values.pressure;
      this.humidity = values.humidity;
    })
  }

  hexToBytes(hex: string): number[] {
    for (var bytes: number[] = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substring(c, c+2), 16));
    return bytes;
  }

  getValuesFromByteArray(bytes: number[]) {
    const raw_humidity = this.getSlice(bytes, 57, 7)
    const raw_temperature = this.getSlice(bytes, 50, 7)
    const raw_pressure = this.getSlice(bytes, 42, 8)
    const raw_longitude = this.getSlice(bytes, 27, 15)
    const raw_latitude = this.getSlice(bytes, 12, 15)
    const raw_altitude = this.getSlice(bytes, 0, 12)
    return {
      altitude: Math.round(raw_altitude*12.2314453-100),
      latitude: raw_latitude/1000 - 16.384 + 49.317,
      longitude: raw_longitude/1000 - 16.384 + 11.023,
      pressure: Math.round(raw_pressure*5.86),
      temperature: raw_temperature-90,
      humidity: Math.round(raw_humidity*0.793650794),
    }
  }

  getSlice(bytes: number[], start_bit: number, length: number) {
    if (length > 32) return -1;
    const total_bits = bytes.length*8;
    const end_bit = start_bit + length - 1;
    const start_byte = Math.floor(start_bit / 8);
    const end_byte = Math.floor(end_bit / 8);
    if (end_byte >= bytes.length) return -2;
    var number = 0;
    for (let i = start_byte; i <= end_byte; i++) {
      number = number << 8 | bytes[i];
    }
    number = number >> ((total_bits - (end_bit+1))%8);
    number = number & Math.pow(2, length) - 1
    return number
  }

  ngOnDestroy(): void {
    this.formUpdateSubscription.unsubscribe();
  }
}
