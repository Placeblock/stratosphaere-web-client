import { Injectable } from '@angular/core';
import { Analyser } from '../classes/analyser';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor() {
  }

  loadFile(file: File) {
    if (file.type != "text/plain") return;
    console.log(file.name);
    console.log(file.size);
    console.log(file.type);
    const fileReader: FileReader = new FileReader();
    fileReader.onloadend = event => {
      console.log(event);
      console.log(typeof fileReader.result);
      if (typeof fileReader.result == "string") {
        console.log(event);
        const analyser: Analyser = new Analyser(fileReader.result);
      }
    }
    fileReader.readAsText(file);
  }
}
