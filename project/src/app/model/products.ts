<<<<<<< Updated upstream
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
=======
export class Products {
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public quantity: number;
    public image: string;

    constructor(id: number, name: string, description: string, price: number, quantity: number, image: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
>>>>>>> Stashed changes
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

    getQuantity(): number {
        return this.quantity;
    }

    setQuantity(quantity: number) {
        this.quantity = quantity;
    }

<<<<<<< HEAD
    getImage(): string {
        return this.image;
    }

    setImage(image: string) {
        this.image = image;
=======
    getStock(): number {
        return this.quantity;
    }

    setStock(quantity: number) {
        this.quantity = quantity;
>>>>>>> 93f2474a4cf9f21c1a89aa7547927d92feab5756
    }
}
