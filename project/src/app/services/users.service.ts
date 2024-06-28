import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users : User[] =[]
  baseUrl : string = 'http://localhost/backend'
  headers = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http:HttpClient,private router: Router) {
    this.refreshUsers()
   }


   getUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/getUsers.php`)
  }


  refreshUsers(){
    this.getUsers().subscribe(
      (data: User[])=>{
        this.users = data
      }
    )
  }

  addUser(user: User) {
    return this.http.post<User[]>(`${this.baseUrl}/addUser.php`, JSON.stringify(user), { headers: this.headers });
  }

  exists(email:string){
    for(let user of this.users){
      if(user.email==email)
        return user
    }
    return null
  }

  register(email:string, password:string, name : string, male : boolean, birthDate : Date){
    let user = new User(email,password,name,male,birthDate)
    this.addUser(user).subscribe((data) =>{
      this.refreshUsers()
    }
    )
  }

  login(email:string, password:string){
    for(let user of this.users){
      if(user.email == email && user.password == password){
        sessionStorage.setItem('currentUser', email)
        break
      }
    }
  }

  logout(){
    sessionStorage.removeItem('currentUser')
    this.router.navigateByUrl('profile/login')
  }

}
