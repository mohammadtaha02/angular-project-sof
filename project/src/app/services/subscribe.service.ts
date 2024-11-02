import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscribeModel } from '../model/subscribe';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private apiUrl = 'http://localhost/backend/php/subscribers';

  constructor(private http: HttpClient) { }

  subscribeUser(subscribeData: SubscribeModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscribe.php`, {subscribeData});
  }
}
