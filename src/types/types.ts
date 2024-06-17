export interface Order {
  id: string;
  'customer-id': string;
  items: OrderItemType[];
  total: string;
};

export type OrderItemType = {
  'product-id': string;
  quantity: string;
  total: string;
  'unit-price': string;
};

export interface Customer {
  id: string;
  name: string;
  since: string;
  revenue: string;
};

export interface Product {
  id: string;
  description: string;
  category: string;
  price: string;
  quantity?: string;
};
