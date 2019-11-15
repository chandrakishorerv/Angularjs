import { TestBed } from '@angular/core/testing';

import { TrashserviceService } from './trashservice.service';

describe('TrashserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrashserviceService = TestBed.get(TrashserviceService);
    expect(service).toBeTruthy();
  });
});
