export class Cart {
    cart_id: number;
    user_id: number;
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    total_price: number;
    product_image: string;
  
    constructor(
      cart_id: number,
      user_id: number,
      product_id: number,
      product_name: string,
      product_price: number,
      quantity: number,
      total_price: number,
      product_image: string
    ) {
      this.cart_id = cart_id;
      this.user_id = user_id;
      this.product_id = product_id;
      this.product_name = product_name;
      this.product_price = product_price;
      this.quantity = quantity;
      this.total_price = total_price;
      this.product_image = product_image;
    }
  }
  