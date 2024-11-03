
export class Supplement {
  getMovies() {
    throw new Error('Method not implemented.')
  }

    public title: string
    public img: string


    constructor(title: string,img: string)
    {
        this.title = title
        this.img = img
     }
  
    getTitle(): string {
      return this.title;
    }
  
    getImage(): string {
      return this.img;
    }
  
    toString(): string {
      return `${this.title} `;
    }
  }
  