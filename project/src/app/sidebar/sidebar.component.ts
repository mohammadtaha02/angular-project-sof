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
    { name: 'back' },
    { name: 'legs' },
    { name: 'chests' },
    { name: 'bicycle' },
    { name: 'biceps' },
    { name: 'running' },
    { name: 'stair' },
  ];

  constructor() {}

  ngOnInit(): void {}

  selectCategory(categoryName: string) {
    this.categorySelected.emit(categoryName);
  }
}
