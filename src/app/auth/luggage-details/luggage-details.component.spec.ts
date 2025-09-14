import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuggageDetailsComponent } from './luggage-details.component';

describe('LuggageDetailsComponent', () => {
  let component: LuggageDetailsComponent;
  let fixture: ComponentFixture<LuggageDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LuggageDetailsComponent]
    });
    fixture = TestBed.createComponent(LuggageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
