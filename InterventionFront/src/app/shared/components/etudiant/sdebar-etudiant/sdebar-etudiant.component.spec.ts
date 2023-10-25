import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdebarEtudiantComponent } from './sdebar-etudiant.component';

describe('SdebarEtudiantComponent', () => {
  let component: SdebarEtudiantComponent;
  let fixture: ComponentFixture<SdebarEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SdebarEtudiantComponent]
    });
    fixture = TestBed.createComponent(SdebarEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
