import { Component, HostBinding } from '@angular/core';
import { AnalysisService } from 'src/app/services/analysis.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent {
  @HostBinding('class.earth-background') earth: boolean = true;
  @HostBinding('class.space-navbar') spaceNavbar: boolean = true;

  constructor(private analysisService: AnalysisService) {

  }

  selectFile(event: Event) {
    let files: FileList | null = (<HTMLInputElement>event.target).files;
    if (files == null) return;
    let file = files[0];
    this.analysisService.loadFile(file);
  }

}
