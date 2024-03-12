
export class Movie {
  getMovies() {
    throw new Error('Method not implemented.')
  }

    public title: string
    public director: string
    public year: number
    public genres: string[]
    public img: string


    constructor(title: string,director: string,year: number,genres: string[],img: string)
    {
        this.title = title
        this.director = director
        this.year = year
        this.genres = genres
        this.img = img
     }
  
    getTitle(): string {
      return this.title;
    }
  
    getDirector(): string {
      return this.director;
    }
  
    getYear(): number {
      return this.year;
    }
  
    getGenres(): string[] {
      return this.genres;
    }
  
    getImage(): string {
      return this.img;
    }
  
    toString(): string {
      return `${this.title} (${this.year}), directed by ${this.director}. Genre: ${this.genres.join(', ')}`;
    }
  }
  