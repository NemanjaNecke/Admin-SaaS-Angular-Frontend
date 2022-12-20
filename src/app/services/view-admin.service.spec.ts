import { TestBed } from '@angular/core/testing';

import { ViewAdminService } from './view-admin.service';

describe('ViewAdminService', () => {
  let service: ViewAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
