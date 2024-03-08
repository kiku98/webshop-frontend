import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RestService } from './rest.service';
import { User } from '../interfaces/user.interface';
import { mock_users } from '../MOCK/MOCK_USERS';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users!: User[];

  currentUser = new BehaviorSubject<User>({
    user_id: -1,
    name: 'init',
    last_name: 'init',
    email: 'init@init.com',
  });

  constructor(private restService: RestService) {
    this.getUsers();
    this.currentUser.next(this.users[0]);
  }

  async getUsers(): Promise<void> {
    // TODO: Replace with API call
    // this.users = (await this.restService.getData('users')) as User[];
    this.users = mock_users;
  }
}
