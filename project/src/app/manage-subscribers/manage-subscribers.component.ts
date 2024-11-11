import { Component, OnInit } from '@angular/core';
import { SubscribeService } from '../services/subscribe.service';

@Component({
  selector: 'app-manage-subscribers',
  templateUrl: './manage-subscribers.component.html',
  styleUrls: ['./manage-subscribers.component.css']
})
export class ManageSubscribersComponent implements OnInit {
  subscribers: any[] = [];
  selectedSubscriber: any = null;
  isEditing: boolean = false;

  constructor(private subscriberService: SubscribeService) {}

  ngOnInit(): void {
    this.fetchSubscribers();
  }

  fetchSubscribers(): void {
    this.subscriberService.getSubscribers().subscribe(
      (response:any) => {
        if (response) {
          this.subscribers = response;
        } else {
          console.error('Error fetching subscribers');
        }
      },
      (error:any) => {
        console.error('Error fetching subscribers:', error);
      }
    );
  }

  editSubscriber(subscriber: any): void {
    this.selectedSubscriber = { ...subscriber }; // Make a copy of the subscriber to edit
    this.isEditing = true;
  }

  saveSubscriber(): void {
    this.subscriberService.editSubscriber(this.selectedSubscriber).subscribe(
      (response:any) => {
        if (response.status === 'success') {
          console.log('Subscriber updated successfully.');
          this.isEditing = false;
          this.fetchSubscribers(); // Refresh subscriber list
        } else {
          console.error('Error updating subscriber:', response.message);
        }
      },
      (error:any) => {
        console.error('Error updating subscriber:', error);
      }
    );
  }

  cancelEdit(): void {
    this.selectedSubscriber = null;
    this.isEditing = false;
  }

  deleteSubscriber(subscriberId: number): void {
    if (confirm('Are you sure you want to delete this subscriber? This will mark the subscriber as inactive.')) {
      this.subscriberService.softDeleteSubscriber(subscriberId).subscribe(
        (response:any) => {
          if (response.status === 'success') {
            console.log('Subscriber marked as inactive successfully.');
            this.fetchSubscribers();
          } else {
            console.error('Error deleting subscriber:', response.message);
          }
        },
        (error:any) => {
          console.error('Error deleting subscriber:', error);
        }
      );
    }
  }
}
