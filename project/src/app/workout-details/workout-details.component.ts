import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../services/workouts.service';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {
  workout: any;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.workoutService.getWorkoutById(id).subscribe(data => {
        this.workout = data;
      });
    }
  }
}
