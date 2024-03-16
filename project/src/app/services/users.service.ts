import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users : User[] =[
    new User('mohammad@gmail.com','1234','mohammad',true),
    new User('adn@gmail.com','lad123','adn',false)
  ]
  constructor() { }
  getUsers(){
    return this.users
  }
  getUser(email:string){
    for(let user of this.users){
      if(user.getEmail()==email)
        return user
    }
    return null
  }
}
