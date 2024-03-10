import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  products!: Product[];
  isListView = true;

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.productsService.products.subscribe((products) => {
      this.products = products;
    });
  }

  switchToListView(): void {
    this.isListView = true;
  }

  switchToCardView(): void {
    this.isListView = false;
  }
  showAlert(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
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

  checkCartQuantity(product: Product): boolean {
    const cart_quantity = 0;
    return cart_quantity + product.quantity > product.qty;
  }

  addToCart(product: Product): void {
    //Esta función debería enviar el producto al carrito de compras

    if (product.quantity === 0) {
      this.showAlert(`No se selecciono una cantidad.`);
      return; // Do not proceed if product quantity is 0
    }

    if (this.checkCartQuantity(product)) {
      this.showAlert(
        `No se pueden agregar más unidades de este producto, supera el límite de stock (${product.qty}).`,
      );
    } else {
      // Agregar el producto al carrito de compras
      this.showAlert(`Agregado al carrito: ${product.name}`);
    }

    //reset de la cantidad del producto
    product.quantity = 0;
  }
}
