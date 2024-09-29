export interface Customer {
  customer_id: string;
  customer_name: string;
  currency: string;
}

export interface Product {
  product_id: string;
  product_name: string;
  description: string;
}

export interface Pricing {
  pricing_id: string;
  product_id: string;
  product: Product;
  customer_id: string;
  customer: Customer;
  price: number;
  effective_date: Date;
}

export interface PriceHistory {
  pricing_id: string;
  previous_price: number;
  updated_price: number;
  update_timestamp: Date;
}
