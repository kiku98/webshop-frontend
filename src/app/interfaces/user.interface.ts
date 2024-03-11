import { ShoppingCart } from './shopping-cart.interface';

export interface User {
  id: number;
  name: string;
  email: string;
  carrito: ShoppingCart;
}
