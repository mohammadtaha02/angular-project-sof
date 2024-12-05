import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    let body = JSON.stringify(user);
    return this.http.post<User[]>(`${this.baseUrl}/addUser.php`, body, {
      headers: this.headers
    });
  }

  exists(email: string, password?: string): Observable<User | null> {
    const body = password ? { email: email, password: password } : { email: email };
    return this.http.post<any>(`${this.baseUrl}/checkUser.php`, body, { headers: this.headers })
      .pipe(
        map(response => {
          if (response && response.status !== 'error') {
            // If user exists and is not deleted, map the user data
            const isAdmin = response.is_admin == 1; // Convert `is_admin` from number to boolean
            return new User(
              response.email,
              response.password,
              response.name,
              response.male,
              new Date(response.birth_date),
              isAdmin
            );
          }
          return null; // User not found or is deleted
        }),
        catchError(() => of(null))
      );
  }
  
  register(email: string, password: string, name: string, male: boolean, birthDate: Date) {
    const isAdmin = false;
    let user = new User(email, password, name, male, birthDate, isAdmin);
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

  updateUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateUser.php`, user);
  }  

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser.php`, {
      body: { id: userId }
    });
  } 
  
  softDeleteUser(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/softDeleteUser.php`, { id: userId });
  }
  
}
