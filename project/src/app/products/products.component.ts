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


  toShow: Movie[] = [];
  
  @Input() set categoryToShow(category: string) {
    switch (category) {
      case 'ALL':
        this.toShow = this.moviesService.getCategoryToShow('ALL');
        break;
      case 'back':
        this.toShow = this.moviesService.getCategoryToShow('back');
        break;
      case 'legs':
        this.toShow = this.moviesService.getCategoryToShow('legs');
        break;
      case 'chests':
        this.toShow = this.moviesService.getCategoryToShow('chests');
        break;
      case 'bicycle':
        this.toShow = this.moviesService.getCategoryToShow('bicycle');
        break;
      case 'biceps':
        this.toShow = this.moviesService.getCategoryToShow('biceps');
        break;
      case 'running':
        this.toShow = this.moviesService.getCategoryToShow('running');
        break;
      case 'stair':
        this.toShow = this.moviesService.getCategoryToShow('stair');
        break;
      default:
        this.toShow = [];
        break;
    }
  }  
}
  

