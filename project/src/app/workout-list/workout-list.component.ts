import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../services/workouts.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  workouts: any[] = [];

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe(data => {
      this.workouts = data;
    });
  }
}
