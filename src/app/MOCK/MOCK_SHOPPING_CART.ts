import {
  ShoppingCart,
  ShoppingCartItem,
} from '../interfaces/shopping-cart.interface';

const mock_shopping_cart_products: ShoppingCartItem[] = [
  {
    cantidad: 1,
    producto: {
      sku: 'EU1',
      nombre: 'Apple',
      description: 'Nice Apple',
      unidades_disponibles: 20,
      precio_unitario: 300,
    },
    manejador_reglas: {
      reglas: [],
    },
    regla_precio: null,
    total: 500,
  },
];

export const mock_shopping_cart: ShoppingCart = {
  items: mock_shopping_cart_products,
  total: 1000,
};
