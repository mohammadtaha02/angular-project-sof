import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';  // Import the CartService
import { Products } from '../model/products';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: Products[] = [];
  filteredProducts: Products[] = [];
  isLoggedIn: boolean = false;

  constructor(private productService: ProductService, private cartService: CartService) { }  // Use CartService

  ngOnInit(): void {
    this.isLoggedIn = !!sessionStorage.getItem('currentUser');  // Check if user is logged in
    this.loadProducts();
  }

  // Load all products from the service
  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Products[]) => {
      this.products = data;
      this.filteredProducts = this.products;  // Initially show all products
    });
  }

  // Filter products by category
  filterByCategory(category: string): void {
    if (category === 'ALL') {
      this.filteredProducts = this.products;  // Show all if "ALL" is selected
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }

  // Add to cart functionality using CartService
  addToCart(product: Products): void {
    const userEmail = sessionStorage.getItem('currentUser');
    if (userEmail) {
      if (product.selectedQuantity > product.quantity) {
        console.error('Cannot add to cart, not enough stock available.');
        return;
      }
      this.cartService.addToCart(product.id, product.selectedQuantity, userEmail).subscribe(response => {
        console.log('Product added to cart:', response.message);
        alert('Product added to cart');
      }, error => {
        console.error('Error adding product to cart:', error);
      });
    } else {
      console.error('No user is logged in.');
    }
  }
  

  // Update product stock
  updateProductStock(productId: number, newStock: number): void {
    this.productService.updateProductStock(productId, newStock).subscribe(response => {
      console.log('Stock updated successfully', response);

      // Update the product stock in the frontend as well
      const productToUpdate = this.products.find(p => p.id === productId);
      if (productToUpdate) {
        productToUpdate.quantity = newStock;
      }
    });
  }
}
