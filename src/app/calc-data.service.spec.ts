import { TestBed } from '@angular/core/testing';

import { CalcDataService } from './calc-data.service';

describe('CalcDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalcDataService = TestBed.get(CalcDataService);
    expect(service).toBeTruthy();
  });
});
