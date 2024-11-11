export class Products {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
    image: string;
    selectedQuantity: number;
  
    constructor(
        id: number = 0,
        name: string = '',
        description: string = '',
        price: number = 0,
        category: string = '',
        quantity: number = 0,
        selectedQuantity: number = 0,
        image: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
        this.selectedQuantity = selectedQuantity;
        this.image = image;
    }
    getId(): number {
      return this.id;
    }
  
    getName(): string {
      return this.name;
    }
  
    setId(id: number): void {
      this.id = id;
    }
  
    setName(name: string): void {
      this.name = name;
    }
  
    getDescription(): string {
        return this.description;
    }

    setDescription(description: string) {
        this.description = description;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number) {
        this.price = price;
    }

    getQuantity(): number {
        return this.quantity;
    }

    setQuantity(quantity: number) {
        this.quantity = quantity;
    }

    getImage(): string {
        return this.image;
    }

    setImage(image: string) {
        this.image = image;
    }
}
