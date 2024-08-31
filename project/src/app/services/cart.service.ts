import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost/backend/php/cart';

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.baseUrl}/getCartItems.php?user_id=${sessionStorage.getItem('currentUser')}`);
  }

  addToCart(product_id: number, quantity: number): Observable<any> {
    const user_id = sessionStorage.getItem('currentUser');
    return this.http.post(`${this.baseUrl}/addToCart.php`, { user_id, product_id, quantity });
  }

  updateCartItem(cartId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateCartItem.php`, { cart_id: cartId, quantity });
  }

  removeFromCart(cartId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/removeFromCart.php`, { cart_id: cartId });
  }
}
