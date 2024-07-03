import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';

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

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('currentUser');
    if (this.email != null) {
      this.userService.exists(this.email).subscribe(user => {
        if (user != null) {
          this.image = user.getImage();
          this.name = user.getName();
          this.email = user.getEmail();
          this.male = user.getMale();
          if(this.male == true){
            this.maleInfo = 'Male'
          }
          else{
            this.maleInfo = 'Female'
          }
          this.birthDate = user.getBirthDate();
        } else {
          this.email = '';
        }
      });
    } else {
      this.email = '';
    }
  }
}
