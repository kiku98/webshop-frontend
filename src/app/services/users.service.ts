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
    user_id: -1,
    name: 'init',
    last_name: 'init',
    email: 'init@init.com',
  });

  private apiUrl = 'https://shopping-card-backend.vercel.app/api/v1';

  constructor(private restService: RestService) {
    this.getUsers();
  }

  // ...

  async getUsers(): Promise<void> {
    try {
      const response = await this.restService.getData(`${this.apiUrl}/users`);
      this.users = response.data as User[];
      this.currentUser.next(this.users[0]);
    } catch (error) {
      console.log(
        'Using mock data for users, as the backend can not be reached.',
      );
    }
  }

  changeCurrentUserToId(user_id: number): void {
    const selected_user = this.users.find(
      (user) => user.user_id.toString() === user_id.toString(),
    );
    this.currentUser.next(selected_user as User);
  }
}
