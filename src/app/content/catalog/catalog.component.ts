import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  products!: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.products.subscribe((products) => {
      this.products = products;
    });
  }

  showInfo(product: Product): void {
    alert(product.description);
  }

  incrementQuantity(product: Product): void {
    product.quantity++;
  }

  decrementQuantity(product: Product): void {
    if (product.quantity > 0) {
      product.quantity--;
    }
  }
  addToCart(product: Product): void {
    alert(`Agregado al carrito: ${product.name}`);
    //Esta función debería enviar el producto al carrito de compras
  }
}
