import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { SubscribeService } from '../services/subscribe.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  isSubscribed: boolean = false; // New flag to track subscription status
  user!: any;

  constructor(private router: Router, private userService: UsersService, private subscribeService: SubscribeService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (sessionStorage.getItem('currentUser')) {
          const userEmail = sessionStorage.getItem('currentUser');
          if (userEmail) {
            // Fetch user details
            this.userService.exists(userEmail).subscribe(user => {
              if (user) {
                this.user = user;
                this.loggedIn = true;

                // Fetch subscription status
                this.subscribeService.getSubscriber(userEmail).subscribe(subscriber => {
                  if (!subscriber.error) {
                    this.isSubscribed = true; // User is subscribed
                  } else {
                    this.isSubscribed = false; // User is not subscribed
                  }
                });
              }
            });
          }
        }
      }
    });
  }

  onSubmit() {
    this.loggedIn = false;
    this.userService.logout();
  }
}
