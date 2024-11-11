import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const currentUserEmail = sessionStorage.getItem('currentUser');

    if (currentUserEmail) {
      this.fetchOrders(currentUserEmail);
    } else {
      console.error('No user is currently logged in.');
    }
  }

  fetchOrders(email: string): void {
    this.orderService.getOrders(email).subscribe(
      (response) => {
        console.log(response);
        if (response.status === 'success') {
          this.orders = response.data;
          console.log('Fetched Orders:', this.orders);
        } else {
          console.error('Error fetching orders:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
