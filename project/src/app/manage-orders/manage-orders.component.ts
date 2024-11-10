import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  pendingOrders: any[] = [];
  selectedOrderDetails: any[] = [];
  showOrderDetails: boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('currentUserId');
    if (userId) {
      this.orderService.getPendingOrders(Number(userId)).subscribe((orders) => {
        this.pendingOrders = orders;
      });
    }
  }

  viewOrderDetails(orderId: number): void {
    this.orderService.getOrderDetails(orderId).subscribe((details) => {
      this.selectedOrderDetails = details;
      this.showOrderDetails = true;
    });
  }

  confirmOrder(orderId: number): void {
    this.orderService.confirmOrder(orderId).subscribe((response) => {
      if (response.status === 'success') {
        alert('Order confirmed successfully');
        // Refresh pending orders
        this.ngOnInit();
      } else {
        alert('Failed to confirm order');
      }
    });
  }
}
