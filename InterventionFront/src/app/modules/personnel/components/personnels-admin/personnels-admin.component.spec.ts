import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelsAdminComponent } from './personnels-admin.component';

describe('PersonnelsAdminComponent', () => {
  let component: PersonnelsAdminComponent;
  let fixture: ComponentFixture<PersonnelsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnelsAdminComponent]
    });
    fixture = TestBed.createComponent(PersonnelsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
