export class Training {
    id: number;
    name: string;
    description: string;
    image!: string;
  
    constructor(id: number, name: string, description: string, image: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.image = image;
    }
    getEmail(): number {
        return this.id;
    }

    setEmail(id: number) {
        this.id = id;
    }

    getPassword(): string {
        return this.name;
    }

    setPassword(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.description;
    }

    setName(description: string) {
        this.description = description;
    }

    getImage() : string{
        return this.image
    }

    setImage(image: string){
        this.image = image;
    }
  }
  