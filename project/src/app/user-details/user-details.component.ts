import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  image: string = '';
  name: string = '';
  email!: any;
  male!: boolean;
  maleInfo!: string;
  birthDate!: Date;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('currentUser');
    if (this.email != null) {
      this.userService.exists(this.email).subscribe(user => {
        if (user != null) {
          this.image = user.image;
          this.name = user.name;
          this.email = user.email;
          this.male = user.male;
          this.maleInfo = this.male ? 'Male' : 'Female';
          this.birthDate = user.birthDate;
        } else {
          this.email = '';
        }
      });
    } else {
      this.email = '';
    }
  }
}
