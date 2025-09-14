import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAutoCompleteComponent } from './city-auto-complete.component';

describe('CityAutoCompleteComponent', () => {
  let component: CityAutoCompleteComponent;
  let fixture: ComponentFixture<CityAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityAutoCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
