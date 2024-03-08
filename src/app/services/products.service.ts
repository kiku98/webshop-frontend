import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../interfaces/product.interface';
import { MOCK_PRODUCTS } from '../MOCKDATA/MOCK_PRODUCTS';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = new BehaviorSubject<Product[]>([]);
  currentImagesObs = this.products.asObservable();

  constructor() {
    this.getProductsFromBackend();
  }

  getProductsFromBackend(): void {
    //TODO repolace with correct API-Call from RestService
    this.products.next(MOCK_PRODUCTS);
  }
}
