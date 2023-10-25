import { TestBed } from '@angular/core/testing';

import { EtudiantAuthService } from './etudiant-auth.service';

describe('EtudiantAuthService', () => {
  let service: EtudiantAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtudiantAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
