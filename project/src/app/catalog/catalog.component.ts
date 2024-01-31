import { Component } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  constructor(){

  }

  ngOnInit(): void {

  }

  selectedGenre: string = 'ALL';

  onGenreSelected(genre: string): void {
    this.selectedGenre = genre;
  }
}

