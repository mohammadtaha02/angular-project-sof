import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualWorkoutsComponent } from './actual-workouts.component';

describe('ActualWorkoutsComponent', () => {
  let component: ActualWorkoutsComponent;
  let fixture: ComponentFixture<ActualWorkoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualWorkoutsComponent]
    });
    fixture = TestBed.createComponent(ActualWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
