import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products } from '../model/products';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  selectedCategory: string = 'ALL';
  products: Products[] = [];
  filteredProducts: Products[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.filterProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Products[]) => {
      this.products = data;
      this.filterProducts();
    });
  }

  filterProducts(): void {
    if (this.selectedCategory === 'ALL') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }
  }

  
}
