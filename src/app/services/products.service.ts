import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../interfaces/product.interface';
import { mock_products } from '../MOCK/MOCK_PRODUCTS';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = new BehaviorSubject<Product[]>([]);
  current_images_obs = this.products.asObservable();

  constructor() {
    this.getProductsFromBackend();
  }

  getProductsFromBackend(): void {
    //TODO repolace with correct API-Call from RestService
    this.products.next(mock_products);
  }
}
