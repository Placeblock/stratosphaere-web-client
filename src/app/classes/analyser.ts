import * as moment from 'moment';

export class Analyser {
  result: AnalyserData[] = [];
  startDate: moment.Moment | undefined;
  deltaSystemTime: number | undefined;

  constructor(data: string) {
    this.readLines(data);
  }

  readLines(data: string) {
    const lines: string[] = data.split(/\r?\n/);
    lines.forEach((line) => {
      const data: AnalyserData = this.readLine(line);
      this.result.push(data);
    })
    console.log(this.result);
  }

  readLine(line: string): AnalyserData {
    const values: string[] = line.split(",");
    return new AnalyserData(
        this.extractDate(values[0], values[1], values[2]),
        parseFloat(values[3]), parseFloat(values[4]), parseFloat(values[5]), parseFloat(values[6]), parseFloat(values[7]),
        parseInt(values[8]), parseInt(values[9]), parseInt(values[10]), parseInt(values[11]), parseInt(values[12]),
        parseInt(values[13]), parseInt(values[14]), parseInt(values[15]), parseInt(values[16]), parseInt(values[17]), 
        parseInt(values[18]), parseInt(values[19]), parseInt(values[20]), parseInt(values[21]), parseInt(values[22]),
        parseInt(values[23]), parseInt(values[24]),parseInt(values[25])
    );
  }

  extractDate(systemTime: string, date: string, time: string): Date {
    const numberSystemTime: number = parseInt(systemTime);
    if (this.startDate == undefined || this.deltaSystemTime == undefined) {
        this.deltaSystemTime = numberSystemTime;
        const extractedDate: moment.Moment = moment(date+time, "DDMMYYHHmmssSS");
        this.startDate = extractedDate;
    }
    return this.startDate.clone().add(numberSystemTime-this.deltaSystemTime, 'milliseconds').toDate();
  }

}

export class AnalyserData {
    constructor(
    public readonly time: Date,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly altitude: number,
    public readonly speed: number,
    public readonly course: number,
    public readonly satellites: number,
    public readonly humidity: number,
    public readonly humidityTemperature: number,
    public readonly outsideTemperature: number,
    public readonly accelerationX: number,
    public readonly accelerationY: number,
    public readonly accelerationZ: number,
    public readonly gyroX: number,
    public readonly gyroY: number,
    public readonly gyroZ: number,
    public readonly accelerationTemperature: number,
    public readonly pressure: number,
    public readonly pressureTemperature: number,
    public readonly gpsStatus: number,
    public readonly hihStatus: number,
    public readonly lm75Status: number,
    public readonly mpuStatus: number,
    public readonly ms5Status: number) {}
}