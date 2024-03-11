import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RestService } from './rest.service';
import { empty_shopping_cart } from '../interfaces/shopping-cart.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users = new BehaviorSubject<User[]>([]);
  currentUser = new BehaviorSubject<User>({
    id: -1,
    name: 'init',
    email: 'init@init.com',
    carrito: empty_shopping_cart,
  });

  constructor(private restService: RestService) {
    this.getUsers();
  }

  async getUsers(): Promise<void> {
    const response = await this.restService.getData('users');
    this.users.next(response.data.usuarios as User[]);
    this.currentUser.next(this.users.getValue()[0]);
  }

  changeCurrentUserToId(id: number): void {
    const selected_user = this.users.getValue().find((user) => user.id == id);
    this.currentUser.next(selected_user as User);
  }
}
