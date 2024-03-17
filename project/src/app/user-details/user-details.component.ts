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
  male !: boolean
  maleInfo !: string
  birthDate !: Date
  birthDateInfo !: string
  constructor(private userService: UsersService){
    this.email = sessionStorage.getItem('user')
    if(this.email != null){
      let user = this.userService.getUser(this.email)
      if(user!=null){
        this.image = user.getImage()
        this.name = user.getName()
        this.email = user.getEmail()
        this.male = user.getMale()
        if(this.male)this.maleInfo = 'Male'
        else this.maleInfo = 'Female'
        this.birthDate = user.getBirthDate()
        const day = this.birthDate.getDate()
        const month = this.birthDate.getMonth()
        const year = this.birthDate.getFullYear()
        this.birthDateInfo = `${day}/${month}/${year}`
      }
    }
    else{
      this.email = ''
    }
  }
}
