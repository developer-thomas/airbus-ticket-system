import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLuggageComponent } from './add-luggage.component';

describe('AddLuggageComponent', () => {
  let component: AddLuggageComponent;
  let fixture: ComponentFixture<AddLuggageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddLuggageComponent]
    });
    fixture = TestBed.createComponent(AddLuggageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
