import { Component, OnInit } from '@angular/core';
import { SubscribeModel } from '../model/subscribe';
import { SubscribeService } from '../services/subscribe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  subscribeModel: SubscribeModel;
  isSubscribed: boolean = false;

  constructor(private subscribeService: SubscribeService, private router: Router) {
    // Initialize the subscribeModel with user email from sessionStorage
    const userEmail = sessionStorage.getItem('currentUser') || '';
    this.subscribeModel = new SubscribeModel(userEmail, new Date(), new Date(), true, 0, 0, 0, '', '', '', '');
  }

  ngOnInit(): void {
    const userEmail = sessionStorage.getItem('currentUser');
    if (userEmail) {
      this.subscribeService.getSubscriber(userEmail).subscribe(subscriberData => {
        if (subscriberData && !subscriberData.error) {
          this.isSubscribed = true;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.subscribeService.subscribeUser(this.subscribeModel).subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            alert('Subscription successful!');
            this.isSubscribed = true;
          } else {
            alert('Subscription failed: ' + response.message);
          }
        },
        error: (error: any) => {
          console.error('Error while subscribing:', error);
          alert('An error occurred while subscribing. Please try again later.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  validateForm(): boolean {
    return (
      this.subscribeModel.age > 0 &&
      this.subscribeModel.height > 0 &&
      this.subscribeModel.weight > 0 &&
      this.subscribeModel.gender.trim() !== '' &&
      this.subscribeModel.fitness_goal.trim() !== '' &&
      this.subscribeModel.fitness_level.trim() !== '' &&
      this.subscribeModel.activity_level.trim() !== ''
    );
  }

  goToWorkoutPlan(): void {
    this.router.navigate(['/profile/workout-plan']);
  }
}
