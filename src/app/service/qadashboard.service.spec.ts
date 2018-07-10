import { TestBed, inject } from '@angular/core/testing';

import { QadashboardService } from './qadashboard.service';

describe('QadashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QadashboardService]
    });
  });

  it('should be created', inject([QadashboardService], (service: QadashboardService) => {
    expect(service).toBeTruthy();
  }));
});
