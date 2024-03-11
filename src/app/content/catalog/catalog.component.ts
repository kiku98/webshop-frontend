import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

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
    private shoppingCartService: ShoppingCartService,
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
    this.showAlert(product.description);
  }

  incrementQuantity(product: Product): void {
    product.quantity++;
  }

  decrementQuantity(product: Product): void {
    if (product.quantity > 0) {
      product.quantity--;
    }
  }

  quantityDisponible(product: Product): boolean {
    return product.quantity <= product.unidades_disponibles;
  }

  precioIsPerGramm(product: Product): boolean {
    return product.sku.startsWith('WE');
  }

  addToCart(product: Product): void {
    //Esta función debería enviar el producto al carrito de compras

    if (product.quantity === 0) {
      this.showAlert(`No se selecciono una cantidad.`);
      return; // Do not proceed if product quantity is 0
    }

    if (!this.quantityDisponible(product)) {
      this.showAlert(
        `No se pueden agregar más unidades de este producto, supera el límite de stock (${product.unidades_disponibles}).`,
      );
    } else {
      // Agregar el producto al carrito de compras
      this.shoppingCartService.addProduct(product.sku, product.quantity);
      this.showAlert(`Agregado al carrito: ${product.nombre}`);
    }

    //reset de la cantidad del producto
    product.quantity = 1;
  }
}
