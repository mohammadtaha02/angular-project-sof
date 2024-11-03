<<<<<<< Updated upstream
import { Component, Input, OnChanges } from '@angular/core';
import { ProductService } from '../services/product.service';
=======
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products } from '../model/products';
>>>>>>> Stashed changes

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnChanges {
  @Input() categoryToShow: string = 'ALL';
  products: any[] = [];
  filteredProducts: any[] = [];
  isLoggedIn!: boolean;

<<<<<<< Updated upstream
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    const currentUser = sessionStorage.getItem('currentUser');
    this.isLoggedIn = !!currentUser;
    this.loadProducts();
  }

  ngOnChanges(): void {
    this.filterProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filterProducts();
    });
  }

  filterProducts(): void {
    if (this.categoryToShow === 'ALL') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => 
        product.name.toLowerCase().includes(this.categoryToShow.toLowerCase()));
=======
export class ProductsComponent implements OnInit {
  toShow: Products[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts('ALL'); // טוען את כל המוצרים כברירת מחדל
  }

  @Input() set categoryToShow(category: string) {
    this.loadProducts(category);
  }

  loadProducts(category: string): void {
    if (category === 'ALL') {
      this.productService.getProductsByType('equipment').subscribe(data => {
        this.toShow = data;
      });
    } else {
      this.productService.getProductsByType(category).subscribe(data => {
        this.toShow = data;
      });
>>>>>>> Stashed changes
    }
  }
}
