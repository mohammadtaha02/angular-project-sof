import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users : User[] =[
    new User('mohammad@gmail.com','1234','mohammad',true, new Date(2002, 9, 12)),
    new User('adn@gmail.com','lad123','adn',false, new Date(1990, 5, 15))
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
  addUser(mail:string, name:string,pass:string, gender:string, birthDate: Date){
    let male = true;
    if(gender != "male") male = false
    let userExists = this.getUser(mail)
    if(!userExists){
      let user = new User(mail,name,pass,male,birthDate)
      this.users.push(user)
      return true
    }
    return false
  }
}
