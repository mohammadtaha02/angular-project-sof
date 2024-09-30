import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost/backend/php/purchase';
  
  savePurchase(purchase: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save-purchase.php`, purchase);
  }

  confirmOrder(purchaseId: number, userEmail: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/order-confirmation.php`, { purchaseId, userEmail });
  }
  getUnconfirmedOrders(userEmail: string) {
    return this.http.post(`${this.baseUrl}/get-unconfirmed-orders.php`, { userEmail });
  }
  
}
