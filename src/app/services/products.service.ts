import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RestService } from './rest.service';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = new BehaviorSubject<Product[]>([]);

  constructor(private restService: RestService) {
    this.getProductsFromBackend();
  }

  async getProductsFromBackend(): Promise<void> {
    //TODO: Remove the MOCK-data and try catch block
    const x = (await this.restService.getData('products')).data as Product[];
    x.forEach((product) => {
      product.quantity = 1;
    });
    this.products.next(x);
  }
}
