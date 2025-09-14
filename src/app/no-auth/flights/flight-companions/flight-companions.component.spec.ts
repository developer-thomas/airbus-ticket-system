import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCompanionsComponent } from './flight-companions.component';

describe('FlightCompanionsComponent', () => {
  let component: FlightCompanionsComponent;
  let fixture: ComponentFixture<FlightCompanionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FlightCompanionsComponent]
    });
    fixture = TestBed.createComponent(FlightCompanionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
