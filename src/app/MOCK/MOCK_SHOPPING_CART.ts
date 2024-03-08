import {
  ShoppingCart,
  ShoppingCartProduct,
  UnitType,
} from '../interfaces/shopping-cart.interface';

const mock_shopping_cart_products: ShoppingCartProduct[] = [
  {
    sku: 'ME123',
    name: 'Bananas',
    description: 'Delicious Bananas',
    unit_price: 1000,
    unit_type: UnitType.gramo,
    quantity: 10,
    discount: 1000,
    total_price: 9000,
  },
  {
    sku: 'ME1234',
    name: 'Apple',
    description: 'Delicious Apples',
    unit_price: 2000,
    unit_type: UnitType.gramo,
    quantity: 3,
    discount: 0,
    total_price: 6000,
  },
];

export const mock_shopping_cart: ShoppingCart = {
  shopping_card_id: 1,
  total_price: 1000000,
  total_discount: 500000,
  products: mock_shopping_cart_products,
};
