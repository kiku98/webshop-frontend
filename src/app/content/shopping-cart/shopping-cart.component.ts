import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Product } from 'src/app/interfaces/product.interface';
import {
  ShoppingCartItem,
  empty_shopping_cart,
} from 'src/app/interfaces/shopping-cart.interface';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  shopping_cart = empty_shopping_cart;
  cart_empty: boolean = true;
  purchase_completed: boolean = false;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.shopping_cart.subscribe((shopping_cart) => {
      this.shopping_cart = shopping_cart;
      if (this.shopping_cart.items.length > 0) {
        this.cart_empty = false;
      } else {
        this.cart_empty = true;
      }
    });
  }

  showInfo(product: Product): void {
    this.showAlert(product.description);
  }

  showAlert(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  precioIsPerGramm(product: Product): boolean {
    return product.sku.startsWith('WE');
  }

  formatNumberWithCommas(num: number | undefined): string {
    if (num === undefined) {
      return '0';
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  returnToShoppingCar(): void {
    this.cart_empty = true;
    this.purchase_completed = false;
  }

  calcularDisquento(shopping_cart_item: ShoppingCartItem): string {
    return (
      -(
        shopping_cart_item.total -
        shopping_cart_item.cantidad *
          shopping_cart_item.producto.precio_unitario
      ) + ' COP'
    );
  }

  removeItem(product: Product): void {
    this.shoppingCartService.removeProduct(product.sku);
    this.showAlert(`Retirado del carrito: ${product.nombre}`);
  }

  clearShoppingCart(): void {
    this.shoppingCartService.clearShoppingCart();
  }

  async completePurchase(): Promise<void> {
    const items_not_disponible =
      await this.shoppingCartService.completePurchase();

    if (items_not_disponible.length > 0) {
      const error_string: string = items_not_disponible
        .map(
          (item) =>
            `${item.producto.nombre}: ${item.producto.unidades_disponibles} | `,
        )
        .join(', ');
      this.showAlert(`No se pueden agregar más unidades: ${error_string}.`);
    } else {
      await Promise.all([
        this.productsService.getProducts(),
        this.shoppingCartService.getShoppingCart(),
      ]);
      this.purchase_completed = true;
    }
  }
}
