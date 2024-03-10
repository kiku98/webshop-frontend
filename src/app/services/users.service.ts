import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RestService } from './rest.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [];
  currentUser = new BehaviorSubject<User>({
    id: -1,
    name: 'init',
    last_name: 'init',
    email: 'init@init.com',
  });

  constructor(private restService: RestService) {
    this.getUsers();
  }

  async getUsers(): Promise<void> {
    try {
      const response = await this.restService.getData(`users`);
      this.users = response.data as User[];
      this.currentUser.next(this.users[0]);
      console.log('Users:', this.users);
    } catch (error) {
      console.error('Error getting users', error);
    }
  }

  changeCurrentUserToId(user_id: number): void {
    const selected_user = this.users.find(
      (user) => user.id.toString() === user_id.toString(),
    );
    this.currentUser.next(selected_user as User);
  }
}
