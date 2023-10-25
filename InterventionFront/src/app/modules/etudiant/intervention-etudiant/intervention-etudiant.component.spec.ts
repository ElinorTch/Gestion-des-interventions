import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionEtudiantComponent } from './intervention-etudiant.component';

describe('InterventionEtudiantComponent', () => {
  let component: InterventionEtudiantComponent;
  let fixture: ComponentFixture<InterventionEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterventionEtudiantComponent]
    });
    fixture = TestBed.createComponent(InterventionEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
