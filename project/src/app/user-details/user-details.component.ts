import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  image : string = ''
  name : string = ''
  email !:any
  constructor(private userService: UsersService){
    this.email = sessionStorage.getItem('user')
    if(this.email != null){
      let user = this.userService.getUser(this.email)
      if(user!=null){
        this.image = user.getImage()
        this.name = user.getName()
      }
    }
    else{
      this.email = ''
    }
  }
}
