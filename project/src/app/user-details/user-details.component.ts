import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { SubscribeService } from '../services/subscribe.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  email: string | null = null;
  image: string = '';
  name: string = '';
  male: boolean = false;
  maleInfo: string = '';
  birthDate: Date = new Date();
  height !: number ;
  weight !: number;
  age !: number;
  fitness_goal :string = '';
  fitness_level : string = '';
  activity_level : string = '';

  constructor(private userService: UsersService , private SubscribeService: SubscribeService) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('currentUser');
    if (this.email != null) {
      this.userService.exists(this.email).subscribe(user => {
        if (user != null) {
          this.image = user.getImage();
          this.name = user.getName();
          this.email = user.getEmail();
          this.male = user.getMale();
          this.maleInfo = this.male ? 'Male' : 'Female';
          this.birthDate = user.getBirthDate();
        } else {
          this.email = '';
        }
      });
      this.SubscribeService.getSubscriber(this.email).subscribe(subscriber => {
        this.height= subscriber.height;
        this.weight= subscriber.weight;
        this.age = subscriber.age
        this.fitness_goal= subscriber.fitness_goal;
        this.fitness_level= subscriber.fitness_level;
        this.activity_level= subscriber.activity_level;
      })
    } else {
      this.email = '';
    }
  }
}