import { Point } from "chart.js";
import { BehaviorSubject, Observable } from "rxjs";

export class Sensor<D> {
    readonly name: string;
    readonly color: string;
    readonly parseValue: (value: D) => number;

    private _data = new BehaviorSubject<SensorData<D>[]>([]);
    $data: Observable<SensorData<D>[]> = this._data.asObservable();

    constructor(name: string, color: string, parseValue: (value: D) => number) {
        this.name = name;
        this.color = color;
        this.parseValue = parseValue;
    }

    public get data() {
        return this._data.getValue();
    }

    public addSensorData(sensorData: SensorData<D>) {
        this._data.next([...this.data, sensorData]);
    }

    public parsePoints(): Point[] {
        let points: Point[] = [];
        for ( let i = 0; i < this.data.length; i++ ) {
            points.push({x: this.data[i].time.getTime(), y: this.parseValue(this.data[i].value)})
        }
        return points;
    }
}



export class SensorData<D> {
    private readonly _time: Date;
    private readonly _value: D;

    constructor(time: Date, value: D) {
        this._time = time;
        this._value = value;
    }

    public get value(): D {
        return this._value;
    }

    public get time(): Date {
        return this._time;
    }
}