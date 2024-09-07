export class Purchase {
    userId: number;
    purchaseDate: Date;
    purchaseData: PurchaseItem[];
    totalPrice: number;

    constructor(userId: number, purchaseData: PurchaseItem[], totalPrice: number) {
        this.userId = userId;
        this.purchaseDate = new Date();
        this.purchaseData = purchaseData;
        this.totalPrice = totalPrice;
    }
}

export class PurchaseItem {
    productId: number;
    quantity: number;
    price: number;

    constructor(productId: number, quantity: number, price: number) {
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }
}
