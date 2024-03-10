// product.interface.ts
export interface Product {
  sku: string;
  name: string;
  description: string;
  unit_price: number;
  unit_type: string | null;
  qty: number;
  quantity: number;
}
