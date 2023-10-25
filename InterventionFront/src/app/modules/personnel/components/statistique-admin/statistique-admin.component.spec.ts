import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueAdminComponent } from './statistique-admin.component';

describe('StatistiqueAdminComponent', () => {
  let component: StatistiqueAdminComponent;
  let fixture: ComponentFixture<StatistiqueAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatistiqueAdminComponent]
    });
    fixture = TestBed.createComponent(StatistiqueAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
