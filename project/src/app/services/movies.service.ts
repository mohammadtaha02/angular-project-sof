import { Injectable } from '@angular/core';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  
  Movies: Movie[] = [
    new Movie('back machine', 'assets/back machine.jpg'),
    new Movie('biceps machine','assets/biceps machine.jpg'),
    new Movie('legs machine','assets/leg machine.jpg'),
    new Movie('legs machine', 'assets/leg machine2.jpg'),
    new Movie('chests machine','assets/chest machine.png'),
    new Movie('bicycle machine','assets/bicycle machine.jpeg'),
    new Movie('running machine', 'assets/running machine.jpg'),
    new Movie('stair machine', 'assets/stair machine.jpg'),
    new Movie('Strawbery Go', 'assets/go strawbery.jpg'),
    new Movie('Cookies Go', 'assets/go vanilla.jpg'),
    new Movie('Cookies Go', 'assets/go cookies.jpg'),
    new Movie('Coffee Go', 'assets/go coffee.jpg'),
  ]

  getMovies(): Movie[] {
    return this.Movies;
  }

  getPopularMovies(): Movie[] {
    return this.Movies.slice(0, 3);
  }

  back: Movie[] = [
    new Movie('back machine', 'assets/back machine.jpg'),
  ];
  
  legs: Movie[] = [
    new Movie('legs machine','assets/leg machine.jpg'),
    new Movie('legs machine', 'assets/leg machine2.jpg'),
  ];

  chests: Movie[] = [
    new Movie('chests machine','assets/chest machine.png'),
  ];

  bicycle : Movie[] = [
    new Movie('bicycle machine','assets/bicycle machine.jpeg'),
  ];

  biceps : Movie[] = [
    new Movie('biceps machine','assets/biceps machine.jpg'),
  ];

  running: Movie[] = [
    new Movie('running machine', 'assets/running machine.jpg'),
  ];

  stair: Movie[] = [
    new Movie('stair machine', 'assets/stair machine.jpg'),
  ];


  getCategoryToShow(category: string) : Movie [] {
    switch (category) {
      case 'ALL':
        return this.getMovies();
      case 'back':
        return this.back;
      case 'legs':
        return this.legs;
      case 'chests':
        return this.chests;
      case 'bicycle':
        return this.bicycle;
      case 'biceps':
        return this.biceps;
      case 'running':
        return this.running;
      case 'stair':
        return this.stair;
      default:
        return []; 
    }
  }
  constructor() { }
}
