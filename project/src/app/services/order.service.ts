import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost/backend/php/orders';

  constructor(private http: HttpClient) { }

  getPendingOrders(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getPendingOrders.php?userId=${userId}`);
  }

  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getOrderDetails.php?orderId=${orderId}`);
  }

  getPurchaseHistory(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getPurchaseHistory.php?userId=${userId}`);
  }

  confirmOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/confirmOrder.php`, { orderId });
  }
}
