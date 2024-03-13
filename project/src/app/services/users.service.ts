import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users : User[] =[
    new User('mohammad@gmail.com','1234'),
    new User('hsn8@gmail.com','lad123')
  ]
  constructor() { }
  getUsers(){
    return this.users
  }
}
