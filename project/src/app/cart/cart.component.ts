import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../model/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe((items: Cart[]) => {
      this.cartItems = items;
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.total_price, 0);
  }

  updateQuantity(item: Cart): void {
    this.cartService.addToCart(item.product_id, item.quantity).subscribe(response => {
      console.log('Quantity updated:', response.message);
    });
  }

  removeFromCart(cartItemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.cart_id !== cartItemId);
    this.cartService.removeFromCart(cartItemId).subscribe(response => {
      console.log('Item removed:', response.message);
    });
  }
}
