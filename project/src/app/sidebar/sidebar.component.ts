import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() categorySelected = new EventEmitter<string>();

  categories = [
    { name: 'ALL'},
    { name: 'Comedy' },
    { name: 'Action' },
    { name: 'Adventure' },
    { name: 'Thriller' },
    { name: 'Biography' },
    { name: 'Drama' },
    { name: 'History' },
    { name: 'Romance' },
  ];

  constructor() {}

  ngOnInit(): void {}

  selectCategory(categoryName: string) {
    this.categorySelected.emit(categoryName);
  }
}
