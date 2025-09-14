import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmateCodeComponent } from './confirmate-code.component';

describe('ConfirmateCodeComponent', () => {
  let component: ConfirmateCodeComponent;
  let fixture: ComponentFixture<ConfirmateCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmateCodeComponent]
    });
    fixture = TestBed.createComponent(ConfirmateCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
