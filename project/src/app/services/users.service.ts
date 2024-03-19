import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users : User[] =[]
  baseUrl : string = 'http://localhost:3000/users'
  headers = {'content-type':'application/json'}

  constructor(private http:HttpClient,private router: Router) {
    this.refreshUsers()
   }


   getUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl)
  }
  
  addUser(user:User){
    let body = JSON.stringify(user)
    return this.http.post(this.baseUrl, body, {
      headers: this.headers
    })
  }

  refreshUsers(){
    this.getUsers().subscribe(
      (data: User[])=>{
        this.users = data
      }
    )
  }

  register(user : User){
    this.addUser(user).subscribe(
      () => {
        this.router.navigateByUrl('profile/login');
      }
    )
  }
  exists(email:string){
    for(let user of this.users){
      if(user.getEmail()==email)
        return user
    }
    return null
  }

}
