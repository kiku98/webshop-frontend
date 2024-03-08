import { Component } from '@angular/core';

interface Product {
  name: string;
  price: number;
  description: string;
  quantity: number;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  products: Product[] = [
    {
      name: 'Producto 1',
      price: 10.99,
      description: 'Descripción del Producto 1',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
    {
      name: 'Producto 2',
      price: 20.49,
      description: 'Descripción del Producto 2',
      quantity: 0,
    },
  ];

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
