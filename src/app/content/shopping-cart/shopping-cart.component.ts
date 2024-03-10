import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ShoppingCart } from 'src/app/interfaces/shopping-cart.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  shopping_cart!: ShoppingCart;
  cart_empty: boolean = false;
  purchase_completed: boolean = false;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.shopping_cart.subscribe((shopping_cart) => {
      this.shopping_cart = shopping_cart;
    });
  }

  showAlert(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  formatNumberWithCommas(num: number | undefined): string {
    if (num === undefined) {
      return '0';
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  doSomething(): void {
    this.showAlert('Does something');
  }

  clearCart(): void {
    //TODO - Validate if the cart have products to change the cart_empty value in addProduct method
    this.shoppingCartService.clearCart();
    this.cart_empty = true;
    this.purchase_completed = false;
    this.showAlert('Carrito limpiado exitosamente.');
  }

  purchaseCompleted(): void {
    //TODO - Implement the purchase logic
    //TODO - Validate if the cart have products to purchase
    if (this.purchase_completed) {
      this.cart_empty = true;
      this.purchase_completed = false;
    } else {
      this.shoppingCartService.clearCart();
      this.showAlert('La compra se ha completado exitosamente.');
      this.purchase_completed = true;
    }
  }
}
