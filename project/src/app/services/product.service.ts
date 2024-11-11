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

  addProduct(product: Products): Observable<any> {
    return this.http.post(`${this.baseUrl}/addProduct.php`, product);
  }

  updateProduct(product: Products): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateProduct.php`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/softDeleteProduct.php`, { product_id: productId });
  }    
  editProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/editProduct.php`, product);
  }
  
}
