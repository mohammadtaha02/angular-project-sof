import { Component, OnInit } from '@angular/core';
import { SubscribeService } from '../services/subscribe.service';

@Component({
  selector: 'app-manage-subscribers',
  templateUrl: './manage-subscribers.component.html',
  styleUrls: ['./manage-subscribers.component.css']
})
export class ManageSubscribersComponent implements OnInit {
  subscribers: any[] = [];

  constructor(private subscribeService: SubscribeService) { }

  ngOnInit(): void {
    this.loadSubscribers();
  }

  loadSubscribers(): void {
    this.subscribeService.getAllSubscribers().subscribe(data => {
      this.subscribers = data;
    });
  }

  editSubscriber(subscriber: any): void {
    console.log('Edit subscriber:', subscriber);
  }

  deleteSubscriber(subscriberId: number): void {
    this.subscribeService.deleteSubscriber(subscriberId).subscribe(response => {
      console.log('Subscriber deleted:', response);
      this.loadSubscribers(); // Refresh subscriber list
    });
  }
}
