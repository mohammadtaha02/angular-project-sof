import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscribeModel } from '../model/subscribe';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) {}

  saveUserSchedule(email: string, schedule: any): Observable<any> {
    return this.http.post('http://localhost/backend/php/schedule/saveSchedule.php', {
      email: email,
      schedule_json: JSON.stringify(schedule)
    });
  }

  getUserSchedule(email: string): Observable<any> {
    return this.http.get(`http://localhost/backend/php/schedule/getSchedule.php?email=${email}`);
  }

  getSubscriberByEmail(email: string): Observable<SubscribeModel> {
    return this.http.get<SubscribeModel>(`http://localhost/backend/php/subscribers/getSubscriber.php?email=${email}`);
  }
}
