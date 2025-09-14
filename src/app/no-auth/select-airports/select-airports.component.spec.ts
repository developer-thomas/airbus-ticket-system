import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAirportsComponent } from './select-airports.component';

describe('SelectAirportsComponent', () => {
  let component: SelectAirportsComponent;
  let fixture: ComponentFixture<SelectAirportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectAirportsComponent]
    });
    fixture = TestBed.createComponent(SelectAirportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
