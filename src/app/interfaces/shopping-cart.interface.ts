import { Product } from './product.interface';

export interface ShoppingCart {
  items: ShoppingCartItem[];
  total: number;
}

export interface ShoppingCartItem {
  cantidad: 1;
  producto: Product;
  manejador_reglas: {
    reglas: any[];
  };
  regla_precio: any;
  total: 500;
}

export enum UnitType {
  gramo = 'gramo',
  kilo = 'kilo',
}

export const empty_shopping_cart: ShoppingCart = {
  items: [],
  total: 0,
};
