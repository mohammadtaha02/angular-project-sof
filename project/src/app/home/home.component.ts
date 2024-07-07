import { Component, OnInit , Injector} from '@angular/core';
import { Movie } from '../model/movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  movie : Movie [] = [] 
  constructor(private injector: Injector) {}

  ngOnInit(): void {
    const moviesService = this.injector.get(MoviesService);
    this.movie = moviesService.getMovies();
  }
}