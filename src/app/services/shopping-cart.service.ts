import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ShoppingCart } from '../interfaces/shopping-cart.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  // products = new BehaviorSubject<ShoppingCart>();
  // currentImagesObs = this.products.asObservable();
  // constructor() {
  //   this.getProductsFromBackend();
  // }
  // getProductsFromBackend(): void {
  //   //TODO repolace with correct API-Call from RestService
  //   this.products.next(MOCK_PRODUCTS);
  // }
}
