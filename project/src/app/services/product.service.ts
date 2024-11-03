import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost/backend/php/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.baseUrl}/getProducts.php`);
  }
  getProductsByCategory(category: string): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.baseUrl}/getProducts.php?category=${category}`);
  }
  getSupplements(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.baseUrl}/getProducts.php?category=supplements`);
  }
  filterProductsByCategory(category: string): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.baseUrl}/getProducts.php?category=${category}`);
  }
  updateProductStock(productId: number, stock: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateStock.php`, { productId, stock });
  }
}
