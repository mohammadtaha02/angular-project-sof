import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  fetchAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (response) => {
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

  updateOrderStatus(orderId: number, newStatus: string): void {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(
      (response) => {
        if (response.status === 'success') {
          // Update the order in the list to reflect the status change
          const order = this.orders.find(o => o.id === orderId);
          if (order) {
            order.status = newStatus;
          }
          console.log('Order status updated successfully.');
        } else {
          console.error('Failed to update order status:', response.message);
        }
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
  }
}
