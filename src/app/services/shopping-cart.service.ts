import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RestService } from './rest.service';
import { UsersService } from './users.service';
import {
  ShoppingCart,
  ShoppingCartItem,
  empty_shopping_cart,
} from '../interfaces/shopping-cart.interface';

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
    let new_shopping_cart = empty_shopping_cart;
    const current_user_id = this.usersService.currentUser.getValue().id;
    if (current_user_id != -1) {
      new_shopping_cart = (
        await this.restService.getData('shopping_cart/' + current_user_id)
      ).data as ShoppingCart;
    }
    this.shopping_cart.next(new_shopping_cart);
  }

  async addProduct(sku: string, quantity: number): Promise<void> {
    try {
      const response = await this.restService.postData(
        'shopping_cart/' + this.usersService.currentUser.getValue().id + '/add',
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

  async removeProduct(sku: string): Promise<void> {
    const response = await this.restService.deleteData(
      'shopping_cart/' +
        this.usersService.currentUser.getValue().id +
        '/remove',
      JSON.stringify({
        sku: sku,
      }),
    );
    this.shopping_cart.next(response.data);
  }

  async completePurchase(): Promise<ShoppingCartItem[]> {
    const current_user_id = this.usersService.currentUser.getValue().id;
    const items = (
      await this.restService.postData(
        'shopping_cart/' + current_user_id + '/complete_purchase',
        JSON.stringify({
          id: current_user_id,
        }),
      )
    ).data as ShoppingCartItem[];
    return items;
  }
}
