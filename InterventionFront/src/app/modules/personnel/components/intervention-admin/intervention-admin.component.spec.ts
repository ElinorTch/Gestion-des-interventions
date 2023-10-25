import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionAdminComponent } from './intervention-admin.component';

describe('InterventionAdminComponent', () => {
  let component: InterventionAdminComponent;
  let fixture: ComponentFixture<InterventionAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterventionAdminComponent]
    });
    fixture = TestBed.createComponent(InterventionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
