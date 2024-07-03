import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTrainingComponent } from './filter-training.component';

describe('FilterTrainingComponent', () => {
  let component: FilterTrainingComponent;
  let fixture: ComponentFixture<FilterTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterTrainingComponent]
    });
    fixture = TestBed.createComponent(FilterTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
