import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-training',
  templateUrl: './view-training.component.html',
  styleUrls: ['./view-training.component.css']
})
export class ViewTrainingsComponent implements OnInit {
  muscleBuildingTrainings: any[] = [];
  weightLossTrainings: any[] = [];

  constructor(
    private trainingService: TrainingService,
    private router: Router  
  ) {}

  ngOnInit(): void {
    this.trainingService.getNonSubTrainingsByGoal('muscle_building').subscribe(data => {
      this.muscleBuildingTrainings = data;
    });

    this.trainingService.getNonSubTrainingsByGoal('weight_loss').subscribe(data => {
      this.weightLossTrainings = data;
    });
  }

  viewDetails(trainingId: number): void {
    this.router.navigate(['/training-details', trainingId]);
  }
}
