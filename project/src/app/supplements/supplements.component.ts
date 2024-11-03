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
<<<<<<< Updated upstream
=======
  supplementCategories: any;
  selectedSupplement: Products | null = null;
>>>>>>> Stashed changes

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
<<<<<<< Updated upstream
    this.productService.getSupplements().subscribe((data: Products[]) => {
      this.supplements = data;
    });
  }
=======
    this.loadSupplements();
  }

  loadSupplements(): void {
    this.productService.getProductsByType('supplement').subscribe(data => {
      // קיבוץ המוצרים לפי טעמים
      this.supplementCategories = this.groupByFlavor(data);
    });
  }

  groupByFlavor(supplements: Products[]): any[] {
    const categories = new Map<string, any>();

    return Array.from(categories.values());
  }

  showSupplement(supplement: Products): void {
    this.selectedSupplement = supplement;
  }
>>>>>>> Stashed changes
}
