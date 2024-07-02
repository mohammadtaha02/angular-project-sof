import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrainingComponent } from './search-training.component';

describe('SearchTrainingComponent', () => {
  let component: SearchTrainingComponent;
  let fixture: ComponentFixture<SearchTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTrainingComponent]
    });
    fixture = TestBed.createComponent(SearchTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
