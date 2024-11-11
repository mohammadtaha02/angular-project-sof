import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscribeModel } from '../model/subscribe';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private apiUrl = 'http://localhost/backend/php/subscribers';

  constructor(private http: HttpClient) { }

  subscribeUser(subscribeData: SubscribeModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscribe.php`, { subscribeData });
  }

  getSubscriber(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get<any>(`${this.apiUrl}/getSubscriber.php`, { params });
  }

  getAllSubscribers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllSubscribers.php`);
  }

  deleteSubscriber(subscriberId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/deleteSubscriber.php`, { subscriberId });
  }

  updateSubscriber(subscriber: SubscribeModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/updateSubscriber.php`, { subscriber });
  }
  
  getSubscribers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSubscribers.php`);
  }

  softDeleteSubscriber(subscriberId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/softDeleteSubscriber.php`, { id: subscriberId });
  }

  editSubscriber(subscriber: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/editSubscriber.php`, subscriber);
  }
  
}
