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
  selectedProduct: Products = new Products(0, '', '', 0, '', 0, 0, '');
  newProduct: Products = new Products(0, '', '', 0, '', 0, 0, '');
  isEditing: boolean = false;
  isAdding: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((response: any) => {
      if (response.status === 'success') {
        this.products = response.data;
      } else {
        console.error('Error fetching products:', response.message);
      }
    }, error => {
      console.error('Error fetching products:', error);
    });
  }

  startEditing(product: Products): void {
    this.selectedProduct = new Products(
      product.id,
      product.name,
      product.description,
      product.price,
      product.category,
      product.quantity,
      product.selectedQuantity,
      product.image
    );
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.selectedProduct = new Products();
    this.isEditing = false;
  }

  editProduct(): void {
    if (this.selectedProduct) {
      this.productService.editProduct(this.selectedProduct).subscribe(response => {
        if (response.status === 'success') {
          alert('Product updated successfully');
          this.getProducts(); // Refresh product list after successful update
          this.cancelEditing(); // Reset editing state
        } else {
          alert('Error updating product: ' + response.message);
        }
      }, error => {
        console.error('Error updating product:', error);
      });
    }
  }

  startAdding(): void {
    this.newProduct = new Products(0, '', '', 0, '', 0, 0, '');
    this.isAdding = true;
  }

  cancelAdding(): void {
    this.newProduct = new Products();
    this.isAdding = false;
  }

  addProduct(): void {
    if (this.newProduct) {
      this.productService.addProduct(this.newProduct).subscribe(response => {
        if (response.status === 'success') {
          alert('Product added successfully');
          this.getProducts(); // Refresh product list after adding a new product
          this.cancelAdding(); // Reset adding state
        } else {
          alert('Error adding product: ' + response.message);
        }
      }, error => {
        console.error('Error adding product:', error);
      });
    }
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(response => {
        if (response.status === 'success') {
          alert('Product deleted successfully');
          this.getProducts(); // Refresh product list
        } else {
          alert('Error deleting product: ' + response.message);
        }
      }, error => {
        console.error('Error deleting product:', error);
      });
    }
  }
}
