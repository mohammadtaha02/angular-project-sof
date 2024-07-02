import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];
  baseUrl: string = 'http://localhost/backend/php/user';
  headers = { 'content-type': 'application/json' };

  constructor(private http: HttpClient, private router: Router) {
    this.refreshUsers();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getUsers.php`);
  }

  refreshUsers() {
    this.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      }
    );
  }

  addUser(user: User) {
    const newUser = {
      email: user.email,
      password: user.password,
      name: user.name,
      male: user.male,
      image: user.image,
      birthDate: user.birthDate
    };
    let body = JSON.stringify(newUser);
    return this.http.post<User[]>(`${this.baseUrl}/addUser.php`, body, {
      headers: this.headers
    });
  }

  exists(email: string): Observable<User | null> {
    return this.http.post<User | null>(`${this.baseUrl}/checkUser.php`, { email }, {
      headers: this.headers
    });
  }

  register(email: string, password: string, name: string, male: boolean, birthDate: Date) {
    let user = new User(email, password, name, male, birthDate);
    this.addUser(user).subscribe((data) => {
      this.refreshUsers();
    });
  }

  login(email: string, password: string) {
    sessionStorage.setItem('currentUser', email);
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigateByUrl('profile/login');
  }
}
