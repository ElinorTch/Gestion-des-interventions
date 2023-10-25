import { TestBed } from '@angular/core/testing';

import { PersonnelAuthService } from './personnel-auth.service';

describe('PersonnelAuthService', () => {
  let service: PersonnelAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonnelAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
