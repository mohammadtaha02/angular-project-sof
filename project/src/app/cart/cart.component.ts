import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { PurchaseService } from '../services/purchase.service';
import { Cart } from '../model/cart';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  purchaseId: number | null = null;
  purchaseDetails: any[] = [];
  unconfirmedOrders: any[] = [];
  modalRef: NgbModalRef | null = null;
  newQuantity: { [productId: number]: number } = {};

  constructor(
    private cartService: CartService,
    private purchaseService: PurchaseService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    const userEmail = sessionStorage.getItem('currentUser');

    if (userEmail) {
      this.loadCartItems();
      this.loadUnconfirmedOrders();
    }

    const storedPurchaseId = sessionStorage.getItem('currentPurchaseId');
    if (storedPurchaseId) {
      this.purchaseId = parseInt(storedPurchaseId, 10);
      if (!isNaN(this.purchaseId)) {
        this.loadPurchaseDetails(this.purchaseId);
      }
    }
  }

  loadUnconfirmedOrders(): void {
    const userEmail = sessionStorage.getItem('currentUser');
    if (userEmail) {
      this.purchaseService.getUnconfirmedOrders(userEmail).subscribe((response: any) => {
        if (response && response.status === 'success' && Array.isArray(response.unconfirmedOrders)) {
          this.unconfirmedOrders = response.unconfirmedOrders;

          // For each unconfirmed order, load its details
          this.unconfirmedOrders.forEach(order => {
            this.purchaseService.getPurchaseDetails(order.id).subscribe(details => {
              order.details = details; // Attach details to the order itself
            });
          });
        } else {
          console.error('Invalid response format:', response);
        }
      }, error => {
        console.error('Error fetching unconfirmed orders:', error);
      });
    } else {
      console.error("No user logged in.");
    }
  }

  loadCartItems(): void {
    const userEmail = sessionStorage.getItem('currentUser');

    if (userEmail) {
      this.cartService.getCartItems(userEmail).subscribe((items: Cart[]) => {
        this.cartItems = items.map(item => {
          item.total_price = typeof item.total_price === 'string'
            ? parseFloat(item.total_price)
            : item.total_price;
            console.log(`Product ID: ${item.product_id}, Stock: ${item.quantity}, Quantity: ${item.quantity}`);
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
  
    // Ensure quantity is a valid positive integer
    const quantity = parseInt(item.quantity.toString(), 10);
  
    if (isNaN(quantity) || quantity < 1) {
      alert('Please enter a valid quantity of 1 or more.');
      item.quantity = 1; // Reset to minimum allowed value if invalid
      return;
    }
  
    // Update quantity in the backend if valid
    if (userEmail) {
      this.cartService.addToCart(item.product_id, quantity, userEmail).subscribe(response => {
        console.log('Quantity updated:', response.message);
        this.loadCartItems(); // Reload to reflect the latest state
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

  confirmPurchase(): void {
    const userEmail = sessionStorage.getItem('currentUser');
    if (userEmail) {
      const purchaseData = {
        userEmail: userEmail,
        purchaseItems: this.cartItems,
        totalPrice: this.getTotalPrice()
      };

      this.purchaseService.savePurchase(purchaseData).subscribe(response => {
        if (response && response.status === 'success') {
          this.purchaseId = response.purchaseId;
          sessionStorage.setItem('currentPurchaseId', this.purchaseId?.toString() ?? '');

          // Load the purchase details after saving
          if (this.purchaseId !== null) {
            this.purchaseService.getPurchaseDetails(this.purchaseId).subscribe(details => {
              this.purchaseDetails = details;
            });
          }

          // Load unconfirmed orders to update the UI
          this.loadUnconfirmedOrders();

          // Clear the cart items after purchase
          this.cartItems = [];

          // Close the modal after successful purchase
          this.closePurchaseModal();

          alert(`Purchase successful! Your order ID is ${this.purchaseId}`);
        } else {
          alert('Purchase failed. Please try again.');
          console.error('Purchase response:', response);
        }
      }, error => {
        console.error('Error saving purchase:', error);
      });
    }
  }

  loadPurchaseDetails(purchaseId: number): void {
    this.purchaseService.getPurchaseDetails(purchaseId).subscribe(details => {
      this.purchaseDetails = details;
    });
  }

  confirmOrder(orderId: number): void {
    const userEmail = sessionStorage.getItem('currentUser');
    if (userEmail) {
      this.purchaseService.confirmOrder(orderId, userEmail).subscribe(response => {
        if (response.status === 'success') {
          alert('Order confirmed as received.');
          this.unconfirmedOrders = this.unconfirmedOrders.filter(order => order.id !== orderId);
        } else {
          alert('Order confirmation failed. Please try again.');
        }
      });
    }
  }

  openPurchaseModal(purchaseModal: any): void {
    this.modalRef = this.modalService.open(purchaseModal);
  }

  closePurchaseModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
