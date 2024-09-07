import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { UsersService } from '../services/users.service';
import { PurchaseService } from '../services/purchase.service'; // Import PurchaseService
import { Cart } from '../model/cart';
import { Purchase, PurchaseItem } from '../model/purchase';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];

  // Inject PurchaseService into the constructor
  constructor(
    private cartService: CartService, 
    private userService: UsersService,
    private purchaseService: PurchaseService
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const userEmail = sessionStorage.getItem('currentUser');
    
    if (userEmail) {
      this.cartService.getCartItems(userEmail).subscribe((items: Cart[]) => {
        this.cartItems = items.map(item => {
          item.total_price = typeof item.total_price === 'string' 
            ? parseFloat(item.total_price) 
            : item.total_price;
          return item;
        });
      }, error => {
        console.error('Error fetching cart items:', error);
      });      
    } else {
      console.error("No valid user email found in session storage.");
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.total_price, 0);
  }

  updateQuantity(item: Cart): void {
    const userEmail = sessionStorage.getItem('currentUser');
    if (userEmail) {
      this.cartService.addToCart(item.product_id, item.quantity, userEmail).subscribe(response => {
        console.log('Quantity updated:', response.message);
        this.loadCartItems();
      });
    } else {
      console.error('No user is logged in.');
    }
  }

  removeFromCart(cartItemId: number): void {
    this.cartService.removeFromCart(cartItemId).subscribe(response => {
      console.log('Item removed:', response.message);
      this.loadCartItems();
    }, error => {
      console.error('Error removing item:', error);
    });
  }

  clearCart() {
    this.cartItems = [];
  }

  confirmPurchase() {
    const userEmail = sessionStorage.getItem('currentUser');
    if (!userEmail) {
        console.error('No user is logged in.');
        return;
    }

    // Prepare the purchase items
    const purchaseItems = this.cartItems.map(item => new PurchaseItem(item.product_id, item.quantity, item.total_price));
    
    // Create the purchase object with the email instead of userId
    const purchase = {
        userEmail: userEmail,
        purchaseItems: purchaseItems,
        totalPrice: this.getTotalPrice()
    };

    // Call the backend service to save the purchase
    this.purchaseService.savePurchase(purchase).subscribe({
        next: (response: any) => {
            console.log('Purchase successful', response);
            this.clearCart(); // Optionally clear the cart after successful purchase
        },
        error: (error: any) => console.error('Purchase failed', error)
    });
  }
}
