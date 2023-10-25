import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPersonnelComponent } from './login-personnel.component';

describe('LoginPersonnelComponent', () => {
  let component: LoginPersonnelComponent;
  let fixture: ComponentFixture<LoginPersonnelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPersonnelComponent]
    });
    fixture = TestBed.createComponent(LoginPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
