import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  purchaseHistory: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('currentUserId');
    if (userId) {
      this.orderService.getPurchaseHistory(Number(userId)).subscribe((history) => {
        this.purchaseHistory = history;
      });
    }
  }
}
