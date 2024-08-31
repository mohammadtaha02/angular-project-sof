import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products } from '../model/products';

@Component({
  selector: 'app-supplements',
  templateUrl: './supplements.component.html',
  styleUrls: ['./supplements.component.css']
})
export class SupplementsComponent implements OnInit {
  supplements: Products[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getSupplements().subscribe((data: Products[]) => {
      this.supplements = data;
    });
  }
}
