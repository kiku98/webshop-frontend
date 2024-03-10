import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RestService } from './rest.service';
import { UsersService } from './users.service';
import {
  ShoppingCart,
  empty_shopping_cart,
} from '../interfaces/shopping-cart.interface';
import { mock_shopping_cart } from '../MOCK/MOCK_SHOPPING_CART';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  shopping_cart = new BehaviorSubject<ShoppingCart>(empty_shopping_cart);

  constructor(
    private restService: RestService,
    private usersService: UsersService,
  ) {
    this.getShoppingCart();
    // Always when we change the user, update the shopping cart
    this.usersService.currentUser.subscribe(() => {
      this.getShoppingCart();
    });
  }

  async getShoppingCart(): Promise<void> {
    //TODO: Remove the MOCK-data and try catch block
    let new_shopping_cart = mock_shopping_cart;
    try {
      const current_user_id = this.usersService.currentUser.getValue().id;
      new_shopping_cart = (
        await this.restService.getData(
          'shopping_cart?user_id=' + current_user_id,
        )
      ).data as ShoppingCart;
    } catch (error) {
      console.log(
        'Using mock data for cart, as the backend can not be reached.',
      );
    }
    this.shopping_cart.next(new_shopping_cart);
  }

  async addProduct(sku: string, quantity: number): Promise<void> {
    try {
      const response = await this.restService.postData(
        'shopping_cart/' +
          this.shopping_cart.getValue().shopping_card_id +
          '/add',
        JSON.stringify({
          sku: sku,
          quantity: quantity,
        }),
      );
      this.shopping_cart.next(response.data);
    } catch (error) {
      alert('This product is not available in this canitdad');
    }
  }

  async removeProduct(sku: string, quantity: number): Promise<void> {
    const response = await this.restService.deleteData(
      'shopping_cart/' +
        this.shopping_cart.getValue().shopping_card_id +
        '/add',
      JSON.stringify({
        sku: sku,
        quantity: quantity,
      }),
    );
    this.shopping_cart.next(response.data);
  }
}
