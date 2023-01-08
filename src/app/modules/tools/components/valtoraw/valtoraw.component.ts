import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-valtoraw',
  templateUrl: './valtoraw.component.html',
  styleUrls: ['./valtoraw.component.scss']
})
export class ValtorawComponent implements OnDestroy, OnInit {

  binaryForm: string = ""
  hexForm: string = ""
  dataForm = this.fb.nonNullable.group({
    latitude: [49.317],
    longitude: [11.023],
    altitude: [300],
    temperature: [0],
    humidity: [50],
    pressure: [950]
  });

  formChangeSubscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder) {
  }

  updateValue() {
    const value = this.dataForm.getRawValue();
    const byteArray = this.getByteArray(value.altitude, value.latitude, value.longitude, value.pressure, value.humidity, value.temperature);
    this.binaryForm = this.toBinaryString(byteArray);
    this.hexForm = this.toHexString(byteArray);
  }

  ngOnInit(): void {
    this.updateValue();
    this.formChangeSubscriptions.push(this.dataForm.valueChanges.subscribe(this.updateValue.bind(this)));
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.formChangeSubscriptions.length; i++) {
      this.formChangeSubscriptions[i].unsubscribe();
    }
  }

  getByteArray(altitude: number, latitude: number, longitude: number, pressure: number, humidity: number, temperature: number): number[] {
    const raw_altitude = Math.round((altitude + 100)/12.2314453);
    const raw_latitude = Math.round((latitude - 49.317 + 16.384) * 1000);
    const raw_longitude = Math.round((longitude - 11.023 + 16.384) * 1000);
    const raw_pressure = Math.round(pressure/5.86);
    const raw_humidity = Math.round(humidity/0.793650794);
    const raw_temperature = Math.round(temperature+90);
    var byteArray = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    this.setBits(byteArray, 0, 12, raw_altitude);
    this.setBits(byteArray, 12, 15, raw_latitude);
    this.setBits(byteArray, 27, 15, raw_longitude);
    this.setBits(byteArray, 42, 8, raw_pressure);
    this.setBits(byteArray, 50, 7, raw_temperature);
    this.setBits(byteArray, 57, 7, raw_humidity);
    return byteArray
  }

  toHexString(byteArray: number[]) {
      return Array.from(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
      }).join('')
  }

  setBits(byteArray: number[], start_bit: number, length: number, value: number) {
    for (let i = start_bit; i < start_bit+length; i++) {
      const byteIndex = Math.floor(i/8);
      if (byteIndex >= byteArray.length) return;
      const byteBitIndex = (i%8) + 1;
      if (value & (1 << (length - (i-start_bit) - 1))) {
          byteArray[byteIndex] = byteArray[byteIndex] | (1 << (8 - byteBitIndex));
      } else {
          byteArray[byteIndex] = byteArray[byteIndex] & ~(1 << (8 - byteBitIndex));
      }
    }
  }

  toBinaryString(bytes: number[]) {
    var text = "";
    for (let j = 0; j < bytes.length; j++) {
        for (let i = 7; i >= 0; i--) {
            text += (bytes[j] & Math.pow(2, i)) ? "1" : "0";
        }
    }
    return text;
  }

}
