import { Injectable } from '@angular/core';
import { Movie } from '../movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  
  Movies: Movie[] = [
    new Movie('fast and and the Furious 1', 'Rob Cohen', 2001, ['Action'],'assets/fast1.jpg'),
    new Movie('Tiger 3', 'Maneesh Sharma', 2023, ['Action', 'Adventure','Thriller'],'assets/tiger3.png'),
    new Movie('Oppenheimer', 'Christopher Nolan', 2023, ['Biography', 'Drama','History'],'assets/oppenheimer.jpg'),
    new Movie('Znachor', 'Michal Gazda', 2023, ['Drama', 'Romance'],'assets/znachor.jpg'),
    new Movie('The Family Plan', 'Simon Cellan Jones', 2023, ['Action', 'Comedy'],'assets/family.jpg'),
  ]

  getMovies(): Movie[] {
    return this.Movies;
  }

  getPopularMovies(): Movie[] {
    return this.Movies.slice(0, 3);
  }

  Adventures: Movie[] = [
    new Movie('Tiger 3', 'Maneesh Sharma', 2023, ['Action', 'Adventure','Thriller'],'assets/tiger3.png')
  ];
  
  Actions: Movie[] = [
    new Movie('fast and and the Furious 1', 'Rob Cohen', 2001, ['Action'],'assets/fast1.jpg'),
    new Movie('Tiger 3', 'Maneesh Sharma', 2023, ['Action', 'Adventure','Thriller'],'assets/tiger3.png'),
    new Movie('The Family Plan', 'Simon Cellan Jones', 2023, ['Action', 'Comedy'],'assets/family.jpg')
  ];

  Biographys: Movie[] = [
    new Movie('Oppenheimer', 'Christopher Nolan', 2023, ['Biography', 'Drama','History'],'assets/oppenheimer.jpg')
  ];

  Comdies: Movie[] = [
    new Movie('The Family Plan', 'Simon Cellan Jones', 2023, ['Action', 'Comedy'],'assets/family.jpg')
  ];

  Dramas: Movie[] = [
    new Movie('Znachor', 'Michal Gazda', 2023, ['Drama', 'Romance'],'assets/znachor.jpg'),
    new Movie('Oppenheimer', 'Christopher Nolan', 2023, ['Biography', 'Drama','History'],'assets/oppenheimer.jpg')
  ];

  Histories: Movie[] = [
    new Movie('Oppenheimer', 'Christopher Nolan', 2023, ['Biography', 'Drama','History'],'assets/oppenheimer.jpg')
  ];

  Thrillers: Movie[] = [
    new Movie('Tiger 3', 'Maneesh Sharma', 2023, ['Action', 'Adventure','Thriller'],'assets/tiger3.png')
  ];

  Romances: Movie[] = [
    new Movie('Znachor', 'Michal Gazda', 2023, ['Drama', 'Romance'],'assets/znachor.jpg')
  ];

  getCategoryToShow(category: string) : Movie [] {
    switch (category) {
      case 'ALL':
        return this.getMovies();
      case 'Adventure':
        return this.Adventures;
      case 'Action':
        return this.Actions;
      case 'Biography':
        return this.Biographys;
      case 'Comedy':
        return this.Comdies;
      case 'Drama':
        return this.Dramas;
      case 'History':
        return this.Histories;
      case 'Thriller':
        return this.Thrillers;
      case 'Romance':
        return this.Romances;
      default:
        return []; 
    }
  }
  constructor() { }
}
