export interface ShoppingCart {
  shopping_card_id: number;
  total_price: number;
  total_discount: number;
  products: ShoppingCartProduct[];
}

export interface ShoppingCartProduct {
  sku: string;
  name: string;
  description: string;
  unit_price: number;
  unit_type: UnitType;
  quantity: number;
  discount: number;
  total_price: number;
}

export enum UnitType {
  gramo = 'gramo',
  kilo = 'kilo',
}

export const empty_shopping_cart: ShoppingCart = {
  shopping_card_id: -1,
  total_price: -1,
  total_discount: -1,
  products: [],
};
