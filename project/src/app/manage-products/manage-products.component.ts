import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products } from '../model/products';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products: Products[] = [];
  newProduct: Products = new Products(0, '', '', 0, '', 0, 0);
  selectedProduct: Products | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  // Function to add or update a product
  saveProduct(): void {
    if (this.selectedProduct) {
      // Update existing product
      this.productService.updateProduct(this.selectedProduct).subscribe(
        (response) => {
          console.log('Product updated successfully:', response);
          this.loadProducts(); // Refresh product list after update
          this.resetForm(); // Reset the form fields
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      // Add new product
      if (this.newProduct.name && this.newProduct.price && this.newProduct.quantity && this.newProduct.category) {
        this.productService.addProduct(this.newProduct).subscribe(
          (response) => {
            console.log('Product added successfully:', response);
            this.loadProducts(); // Refresh product list after adding a new one
            this.resetForm();
          },
          (error) => {
            console.error('Error adding product:', error);
          }
        );
      } else {
        alert('Please fill all product details');
      }
    }
  }

  // Function to load all products
  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  // Function to edit product
  editProduct(product: Products): void {
    this.selectedProduct = new Products(
      product.id,
      product.name,
      product.description,
      product.price,
      product.category,
      product.quantity,
      product.selectedQuantity
    );
  }
  

  // Function to delete product
  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(response => {
      console.log('Product deleted:', response);
      this.loadProducts(); // Refresh product list
    });
  }

  // Function to reset form fields after adding/editing
  resetForm(): void {
    this.newProduct = new Products(0, '', '', 0, '', 0, 0);
    this.selectedProduct = null;
  }

  // Function to cancel editing
  onCancelEdit(): void {
    this.resetForm();
  }
}
