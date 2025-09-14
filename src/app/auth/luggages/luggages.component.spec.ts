import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuggagesComponent } from './luggages.component';

describe('LuggagesComponent', () => {
  let component: LuggagesComponent;
  let fixture: ComponentFixture<LuggagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LuggagesComponent]
    });
    fixture = TestBed.createComponent(LuggagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
