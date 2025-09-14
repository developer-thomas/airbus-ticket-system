import { TestBed } from '@angular/core/testing';

import { AiportServiceService } from './aiport-service.service';

describe('AiportServiceService', () => {
  let service: AiportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
