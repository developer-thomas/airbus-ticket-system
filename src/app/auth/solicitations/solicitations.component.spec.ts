import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationsComponent } from './solicitations.component';

describe('SolicitationsComponent', () => {
  let component: SolicitationsComponent;
  let fixture: ComponentFixture<SolicitationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SolicitationsComponent]
    });
    fixture = TestBed.createComponent(SolicitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
