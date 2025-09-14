import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationsDetailsComponent } from './solicitations-details.component';

describe('SolicitationsDetailsComponent', () => {
  let component: SolicitationsDetailsComponent;
  let fixture: ComponentFixture<SolicitationsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SolicitationsDetailsComponent]
    });
    fixture = TestBed.createComponent(SolicitationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
