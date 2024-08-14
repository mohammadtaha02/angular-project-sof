import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from '../services/training.service';
import { WorkoutService } from '../services/workouts.service';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  training: any;
  workouts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private workoutService: WorkoutService
  ) { }

  ngOnInit(): void {
    const trainingId = this.route.snapshot.paramMap.get('id');
    if (trainingId) {
      this.trainingService.getTrainingById(trainingId).subscribe(training => {
        this.training = training;
      });
  
      this.workoutService.getWorkoutsByTrainingId(trainingId).subscribe(workouts => {
        this.workouts = workouts;
      });
    }
  }
  

  loadWorkouts(trainingId: string) {
    this.workoutService.getWorkoutsByTrainingId(trainingId).subscribe(data => {
      this.workouts = data;
    });
  }
}
