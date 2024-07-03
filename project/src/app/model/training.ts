export class Training {
    id: number;
    name: string;
    description: string;
  
    constructor(id: number, name: string, description: string) {
      this.id = id;
      this.name = name;
      this.description = description;
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
  }
  