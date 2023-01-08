import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValtorawComponent } from './valtoraw.component';

describe('ValtorawComponent', () => {
  let component: ValtorawComponent;
  let fixture: ComponentFixture<ValtorawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValtorawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValtorawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
