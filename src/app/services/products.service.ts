import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RestService } from './rest.service';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = new BehaviorSubject<Product[]>([]);
  private apiUrl = 'shopping-card-backend.vercel.app/api/v1';

  constructor(private restService: RestService) {
    this.getProductsFromBackend();
  }

  async getProductsFromBackend(): Promise<void> {
    try {
      const response = await this.restService.getData(
        `${this.apiUrl}/products`,
      );
      this.products.next(response.data as Product[]);
    } catch (error) {
      console.error('Error fetching products from the backend:', error);
    }
  }
}
