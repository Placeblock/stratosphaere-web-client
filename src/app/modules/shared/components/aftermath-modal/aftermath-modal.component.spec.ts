import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AftermathModalComponent } from './aftermath-modal.component';

describe('AftermathModalComponent', () => {
  let component: AftermathModalComponent;
  let fixture: ComponentFixture<AftermathModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AftermathModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AftermathModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
