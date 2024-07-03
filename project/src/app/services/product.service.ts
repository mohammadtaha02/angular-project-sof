import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost/backend/php/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  addProduct(product: Products): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addProduct.php`, product, { headers: this.headers });
  }

  updateProduct(product: Products): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/updateProduct.php`, product, { headers: this.headers });
  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.baseUrl}/getProducts.php`, { headers: this.headers });
  }

  searchProduct(params: any): Observable<Products[]> {
    return this.http.post<Products[]>(`${this.baseUrl}/searchProduct.php`, params, { headers: this.headers });
  }

  filterProduct(params: any): Observable<Products[]> {
    return this.http.post<Products[]>(`${this.baseUrl}/filterProduct.php`, params, { headers: this.headers });
  }
}
