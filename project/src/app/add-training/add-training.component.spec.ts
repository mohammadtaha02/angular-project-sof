import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingComponent } from './add-training.component';

describe('AddTrainingComponent', () => {
  let component: AddTrainingComponent;
  let fixture: ComponentFixture<AddTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTrainingComponent]
    });
    fixture = TestBed.createComponent(AddTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
