import { mock_shopping_cart } from './MOCK_SHOPPING_CART';
import { User } from '../interfaces/user.interface';

export const mock_users: User[] = [
  {
    id: 1,
    name: 'Bob',
    email: 'bob@gmail.com',
    carrito: mock_shopping_cart,
  },
];
