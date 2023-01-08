import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawtovalComponent } from './rawtoval.component';

describe('RawtovalComponent', () => {
  let component: RawtovalComponent;
  let fixture: ComponentFixture<RawtovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawtovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawtovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
