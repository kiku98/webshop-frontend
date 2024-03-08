import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  currentImagesObs = this.shopping_cart.asObservable();
  constructor() {
    this.getShoppingCartFromBackend();
  }
  getShoppingCartFromBackend(): void {
    //TODO repolace with correct API-Call from RestService
    this.shopping_cart.next(mock_shopping_cart);
  }
}
