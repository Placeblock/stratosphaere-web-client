import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent implements OnInit {
  @HostBinding('class.earth-background') eartClass: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
