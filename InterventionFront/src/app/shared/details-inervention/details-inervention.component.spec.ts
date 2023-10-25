import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInerventionComponent } from './details-inervention.component';

describe('DetailsInerventionComponent', () => {
  let component: DetailsInerventionComponent;
  let fixture: ComponentFixture<DetailsInerventionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsInerventionComponent]
    });
    fixture = TestBed.createComponent(DetailsInerventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
