import { Component, OnInit } from '@angular/core';
import { SubscribeModel } from '../model/subscribe';
import { SubscribeService } from '../services/subscribe.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  subscribeModel: SubscribeModel;

  constructor(private subscribeService: SubscribeService) {
    // Initialize the subscribeModel with user email from sessionStorage
    const userEmail = sessionStorage.getItem('currentUser') || '';
    this.subscribeModel = new SubscribeModel(userEmail, new Date(), new Date(), true, 0, 0, 0, '', '', '', '');
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.subscribeService.subscribeUser(this.subscribeModel).subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            alert('Subscription successful!');
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
}
