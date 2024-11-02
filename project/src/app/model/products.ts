export class Products{
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    quantity!: number;
    image!: string;
    selectedQuantity !: number;

    constructor(id: number, name: string, description: string, price: number, category: string, quantity: number, selectedQuantity:number){
        this.id = id
        this.name = name
        this.description = description
        this.price = price
        this.category = category
        this.quantity = quantity
        this.selectedQuantity = selectedQuantity
    }
    getId(): number {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
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

    getCategory(): string {
        return this.category;
    }

    setCategory(category: string) {
        this.category = category;
    }

    getStock(): number {
        return this.quantity;
    }

    setStock(quantity: number) {
        this.quantity = quantity;
    }
}