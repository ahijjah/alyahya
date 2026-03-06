export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  [key: string]: any; // Keep all other CSV columns
}

export interface CartItem extends Product {
  quantity: number;
  selectedPrice: number;
}

export interface OrderSummary {
  orderId: string;
  customer: {
    name: string;
    mobile: string;
    city: string;
    address: string;
    notes: string;
  };
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  date: string;
}
