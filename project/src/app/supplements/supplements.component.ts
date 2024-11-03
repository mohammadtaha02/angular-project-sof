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
  supplementCategories: any[] = [];
  selectedSupplement: Products | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Load all supplements
    this.loadSupplements();
  }

  // Function to load all supplements and group them by flavor
  loadSupplements(): void {
    this.productService.filterProductsByCategory('supplement').subscribe((data: Products[]) => {
      this.supplements = data;
      // Group products by flavor or category (assuming you want to group by a certain property)
      this.supplementCategories = this.groupByFlavor(data);
    });
  }

  // Group supplements by their flavor or other property
  groupByFlavor(supplements: Products[]): any[] {
    const categories = new Map<string, any>();

    supplements.forEach((supplement) => {
      const flavor = supplement.category; // Use the appropriate property to group, e.g., 'flavor' or 'category'
      if (!categories.has(flavor)) {
        categories.set(flavor, {
          flavor: flavor,
          items: []
        });
      }
      categories.get(flavor).items.push(supplement);
    });

    return Array.from(categories.values());
  }

  // Set the selected supplement to display more details
  showSupplement(supplement: Products): void {
    this.selectedSupplement = supplement;
  }
}
