import { Component, Input, OnChanges } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnChanges {
  @Input() categoryToShow: string = 'ALL';
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
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
    }
  }
}
