import { Component, OnInit , Injector} from '@angular/core';
import { Movie } from '../movie';
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

  /*
    Movies: Movie[] = [
    new Movie('fast and and the Furious 1', 'Rob Cohen', 2001, ['Action'],'assets/fast1.jpg'),
    new Movie('Tiger 3', 'Maneesh Sharma', 2023, ['Action', 'Adventure','Thriller'],'assets/tiger3.png'),
    new Movie('Oppenheimer', 'Christopher Nolan', 2023, ['Biography', 'Drama','History'],'assets/oppenheimer.jpg'),
    new Movie('Znachor', 'Michal Gazda', 2023, ['Drama', 'Romance'],'assets/znachor.jpg'),
    new Movie('The Family Plan', 'Simon Cellan Jones', 2023, ['Action', 'Comedy'],'assets/family.jpg'),
  ];

  constructor() {
  }
}

export class Movie {
  title: string;
  director: string;
  releaseYear: number;
  genre: string[];
  img : string;

  constructor(title: string, director: string, releaseYear: number, genre: string[],img:string) {
    this.title = title;
    this.director = director;
    this.releaseYear = releaseYear;
    this.genre = genre;
    this.img = img;
  }

  getDetails(): string {
    return `${this.title} (${this.releaseYear}), directed by ${this.director}. Genre: ${this.genre.join(', ')}`;
  }

*/
}