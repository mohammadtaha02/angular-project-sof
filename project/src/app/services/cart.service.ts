import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost/backend/php/cart';

  constructor(private http: HttpClient) { }

  addToCart(productId: number, quantity: number, userId: string): Observable<any> {
    const body = { user_id: userId, product_id: productId, quantity: quantity };
    return this.http.post(`${this.baseUrl}/addToCart.php`, body);
  }   

  getCartItems(userEmail: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getCartItems.php?email=${userEmail}`);
  }

  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/removeFromCart.php?id=${cartItemId}`);
  }
}
