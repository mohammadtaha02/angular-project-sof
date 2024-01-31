import { Component, Input } from '@angular/core';
import { Movie } from '../home/home.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
 
export class ProductsComponent {
  allProducts: Movie[] = [
    new Movie('fast and and the Furious 1', 'Rob Cohen', 2001, ['Action'],'assets/fast1.jpg'),
    new Movie('Tiger 3', 'Maneesh Sharma', 2023, ['Action', 'Adventure','Thriller'],'assets/tiger3.png'),
    new Movie('Oppenheimer', 'Christopher Nolan', 2023, ['Biography', 'Drama','History'],'assets/oppenheimer.jpg'),
    new Movie('Znachor', 'Michal Gazda', 2023, ['Drama', 'Romance'],'assets/znachor.jpg'),
    new Movie('The Family Plan', 'Simon Cellan Jones', 2023, ['Action', 'Comedy'],'assets/family.jpg'),
  ]

  Adventures: Movie[] = [
    new Movie('Tiger 3', 'Maneesh Sharma', 2023, ['Action', 'Adventure','Thriller'],'assets/tiger3.png')
  ]
  
  Actions: Movie[] = [
    new Movie('fast and and the Furious 1', 'Rob Cohen', 2001, ['Action'],'assets/fast1.jpg'),
    new Movie('Tiger 3', 'Maneesh Sharma', 2023, ['Action', 'Adventure','Thriller'],'assets/tiger3.png'),
    new Movie('The Family Plan', 'Simon Cellan Jones', 2023, ['Action', 'Comedy'],'assets/family.jpg')
  ]

  Biographys: Movie[] = [
    new Movie('Oppenheimer', 'Christopher Nolan', 2023, ['Biography', 'Drama','History'],'assets/oppenheimer.jpg')
  ]

  Comdies: Movie[] = [
    new Movie('The Family Plan', 'Simon Cellan Jones', 2023, ['Action', 'Comedy'],'assets/family.jpg')
  ]

  Dramas: Movie[] = [
    new Movie('Znachor', 'Michal Gazda', 2023, ['Drama', 'Romance'],'assets/znachor.jpg'),
    new Movie('Oppenheimer', 'Christopher Nolan', 2023, ['Biography', 'Drama','History'],'assets/oppenheimer.jpg')
  ]

  Histories: Movie[] = [
    new Movie('Oppenheimer', 'Christopher Nolan', 2023, ['Biography', 'Drama','History'],'assets/oppenheimer.jpg')
  ]

  Thrillers: Movie[] = [
    new Movie('Tiger 3', 'Maneesh Sharma', 2023, ['Action', 'Adventure','Thriller'],'assets/tiger3.png')
  ]

  Romances: Movie[] = [
    new Movie('Znachor', 'Michal Gazda', 2023, ['Drama', 'Romance'],'assets/znachor.jpg')
  ]

  toShow: Movie[] = [];
  @Input() set categoryToShow(category: string){
    if(category == 'ALL'){
      this.toShow = this.allProducts;
    }
    if(category == 'Adventure'){
      this.toShow = this.Adventures;
    }
    if(category == 'Action'){
      this.toShow = this.Actions;
    }
    if(category == 'Biography'){
      this.toShow = this.Biographys;
    }
    if(category == 'Comedy'){
      this.toShow = this.Comdies;
    }
    if(category == 'Drama'){
      this.toShow = this.Dramas;
    }
    if(category == 'History'){
      this.toShow = this.Histories;
    }
    if(category == 'Thriller'){
      this.toShow = this.Thrillers;
    }
    if(category == 'Romance'){
      this.toShow = this.Romances;
    }
  }
}
