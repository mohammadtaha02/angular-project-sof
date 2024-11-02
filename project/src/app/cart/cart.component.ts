import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { UsersService } from '../services/users.service';
import { PurchaseService } from '../services/purchase.service'; // Import PurchaseService
import { Cart } from '../model/cart';
import { Purchase, PurchaseItem } from '../model/purchase';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  purchaseId: number | null = null;  
  purchaseConfirmed: boolean = false;
  unconfirmedOrders: any[] = [];

  constructor(
    private cartService: CartService, 
    private userService: UsersService,
    private purchaseService: PurchaseService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
    this.loadUnconfirmedOrders();
  }

  loadUnconfirmedOrders(): void {
    const userEmail = sessionStorage.getItem('currentUser');  // Get the user's email from session storage
    if (!userEmail) {
        console.error('No user is logged in.');
        return;
    }
  
    // Call the backend to get unconfirmed orders
    this.purchaseService.getUnconfirmedOrders(userEmail).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.unconfirmedOrders = response.unconfirmedOrders;  // Store unconfirmed orders
        } else {
          console.error(response.message);
        }
      },
      error: (error: any) => {
        console.error('Error fetching unconfirmed orders:', error);
      }
    });
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
  
    const purchaseItems = this.cartItems.map(item => new PurchaseItem(item.product_id, item.quantity, item.total_price));
  
    const purchase = {
        userEmail: userEmail,
        purchaseItems: purchaseItems,
        totalPrice: this.getTotalPrice()
    };
  
    this.purchaseService.savePurchase(purchase).subscribe({
        next: (response: any) => {
            console.log('Purchase successful:', response);
  
            this.purchaseId = response.purchaseId;
            this.purchaseConfirmed = true;

            alert('Purchase confirmed! Check your email for details.');
            this.clearCart();
        },
        error: (error: any) => {
            console.error('Purchase failed', error);
            alert('Purchase failed. Please try again.');
        }
    });
    this.modalService.dismissAll();

    // Use a small delay to ensure the modal is fully dismissed before cleaning up
    setTimeout(() => {
      // Remove any lingering modal backdrops
      const backdrops = document.getElementsByClassName('modal-backdrop');
      while (backdrops.length > 0) {
        backdrops[0].parentNode?.removeChild(backdrops[0]);
      }
  
      // Remove 'modal-open' class from body, which disables scrolling
      document.body.classList.remove('modal-open');
      document.body.style.overflow = ''; // Ensure scrolling is enabled
  
    }, 3000);
  }
  
  

  confirmOrder(purchaseId: number) {
    const userEmail = sessionStorage.getItem('currentUser');  // Get the current user's email
    if (!userEmail || !purchaseId) {
        console.error('No user is logged in or purchase ID is missing.');
        return;
    }
  
    // Send the purchaseId and userEmail to the backend to confirm the order
    this.purchaseService.confirmOrder(purchaseId, userEmail).subscribe({
        next: (response: any) => {
            console.log('Order confirmation successful:', response);
            alert('Order confirmed as received.');
  
            // Remove the confirmed order from the list
            this.unconfirmedOrders = this.unconfirmedOrders.filter(order => order.id !== purchaseId);
        },
        error: (error: any) => {
            console.error('Order confirmation failed', error);
            alert('Order confirmation failed. Please try again.');
        }
    });
  }
  
  
  
}
