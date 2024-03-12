import { Component, Input ,Injector} from '@angular/core';
import { Movie } from '../movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {
  private moviesService: MoviesService;

  constructor(private injector: Injector) {
    this.moviesService = this.injector.get(MoviesService);
  }

  allProducts: Movie[] = [];
  Adventures: Movie[] = [];
  Actions: Movie[] = [];
  Biographys: Movie[] = [];
  Comdies: Movie[] = [];
  Dramas: Movie[] = [];
  Histories: Movie[] = [];
  Thrillers: Movie[] = [];
  Romances: Movie[] = [];
  toShow: Movie[] = [];
  
  @Input() set categoryToShow(category: string) {
    switch (category) {
      case 'ALL':
        this.toShow = this.moviesService.getCategoryToShow('ALL');
        break;
      case 'Adventure':
        this.toShow = this.moviesService.getCategoryToShow('Adventure');
        break;
      case 'Action':
        this.toShow = this.moviesService.getCategoryToShow('Action');
        break;
      case 'Biography':
        this.toShow = this.moviesService.getCategoryToShow('Biography');
        break;
      case 'Comedy':
        this.toShow = this.moviesService.getCategoryToShow('Comedy');
        break;
      case 'Drama':
        this.toShow = this.moviesService.getCategoryToShow('Drama');
        break;
      case 'History':
        this.toShow = this.moviesService.getCategoryToShow('History');
        break;
      case 'Thriller':
        this.toShow = this.moviesService.getCategoryToShow('Thriller');
        break;
      case 'Romance':
        this.toShow = this.moviesService.getCategoryToShow('Romance');
        break;
      default:
        this.toShow = [];
        break;
    }
  }  
}
  

