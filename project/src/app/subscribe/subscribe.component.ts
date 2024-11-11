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
  loggedIn: boolean = false;
  isEditing: boolean = false;

  constructor(private subscribeService: SubscribeService, private router: Router) {
    // Initialize the subscribeModel with user email from sessionStorage
    const userEmail = sessionStorage.getItem('currentUser') || '';
    this.subscribeModel = new SubscribeModel(userEmail, new Date(), new Date(), true, 0, 0, 0, '', '', '', '');
  }

  ngOnInit(): void {
    const userEmail = sessionStorage.getItem('currentUser');
    if (userEmail) {
      this.loggedIn = true; // Set loggedIn to true if user is logged in
      this.subscribeService.getSubscriber(userEmail).subscribe(subscriberData => {
        if (subscriberData && !subscriberData.error) {
          this.isSubscribed = true;
        }
      });
    } else {
      this.loggedIn = false; // Set loggedIn to false if no user is logged in
    }
  }

  editSubscription(): void {
    this.isEditing = true;
  }

  onUpdateSubmit(subscribeForm: any): void {
    if (subscribeForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    this.subscribeService.updateSubscriber(this.subscribeModel).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          alert('Subscription updated successfully!');
          this.isEditing = false; // Close edit mode after successful update
        } else {
          alert('Failed to update subscription: ' + response.message);
        }
      },
      error: (error: any) => {
        console.error('Error while updating subscription:', error);
        alert('An error occurred while updating. Please try again later.');
      }
    });
  }

  onSubmit(subscribeForm: any): void {
    console.log('Form submission attempted');
    if (subscribeForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Proceed with subscription if the form is valid
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

  onInvalidForm(subscribeForm: any): void {
    if (!subscribeForm.valid) {
      alert('Please fill in all required fields.');
    }
  }
  

  goToWorkoutPlan(): void {
    this.router.navigate(['/profile/workout-plan']);
  }
}
