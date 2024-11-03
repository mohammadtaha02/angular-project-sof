import { Injectable } from '@angular/core';
import { Supplement } from '../model/supplements';

@Injectable({
  providedIn: 'root'
})
export class SupplementsService {
  getCategoryToShow(arg0: string): Supplement[] {
    throw new Error('Method not implemented.');
  }
  
  supplements: Supplement[] = [
    new Supplement('GO Strawberry', 'assets/go strawberry.jpg'),
    new Supplement('GO Vanilla', 'assets/go vanilla.jpg'),
    new Supplement('GO Cookies', 'assets/go cookies.jpg'),
    new Supplement('GO Coffee', 'assets/go coffee.jpg'),
    new Supplement('Bicycle Machine','assets/bicycle_machine.jpeg'),
    new Supplement('Legs Machine','assets/leg_machine.jpg'),
    new Supplement('Chest Machine','assets/chest_machine.png'),
    
  ];

  getSupplements(): Supplement[] {
    return this.supplements;
  }

  getPopularSupplements(): Supplement[] {
    return this.supplements.slice(0, 3);
  }

  constructor() { }
}
