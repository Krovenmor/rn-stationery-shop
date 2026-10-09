export interface Product {
    id: string;
    name: string;
    category: string;
    brand: string;
    price: number;
    stock: number;
    description: string;
    image_url: string;
  }
  
  // Строка корзины: сам товар + количество
  export interface CartLine {
    product: Product;
    quantity: number;
  }
