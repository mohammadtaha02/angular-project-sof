import { Component, OnInit } from '@angular/core';
import { ProgressModel } from '../model/progress';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  progressModel: ProgressModel = new ProgressModel(0, 0);
  progressData: any[] = [];

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    const userEmail = sessionStorage.getItem('currentUser');
    if (userEmail) {
      this.progressService.getUserProgress(userEmail).subscribe({
        next: (progressData: any) => {
          this.progressData = progressData;
        },
        error: (error: any) => {
          console.error('Error fetching progress:', error);
        }
      });
    } else {
      console.error('User email not found in sessionStorage.');
    }
  }
  
  onSubmitProgress(): void {
    if (this.validateProgressForm()) {
      const userEmail = sessionStorage.getItem('currentUser');
      if (userEmail) {
        this.progressService.saveUserProgress(userEmail, this.progressModel).subscribe({
          next: (response: { status: string }) => {
            if (response.status === 'success') {
              alert('Progress saved successfully!');
              this.refreshProgress();
            } else {
              alert('Failed to save progress.');
            }
          },
          error: (error: any) => {
            console.error('Error saving progress:', error);
            alert('An error occurred while saving progress.');
          }
        });
      } else {
        console.error('User email not found in sessionStorage.');
      }
    }
  }
  
  validateProgressForm(): boolean {
    return this.progressModel.workoutDone >= 0 && this.progressModel.caloriesConsumed >= 0;
  }

  refreshProgress(): void {
    const userId = sessionStorage.getItem('currentUser');
    if (userId) {
      this.progressService.getUserProgress(userId).subscribe({
        next: (progressData: any) => {
          this.progressData = progressData;
        },
        error: (error: any) => {
          console.error('Error fetching progress:', error);
        }
      });
    }
  }
}
