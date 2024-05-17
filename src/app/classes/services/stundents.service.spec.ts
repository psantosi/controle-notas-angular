import { TestBed } from '@angular/core/testing';

import { StundentsService } from './stundents.service';

describe('StundentsService', () => {
  let service: StundentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StundentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
