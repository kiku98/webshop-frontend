import { Component } from '@angular/core';

import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
})
export class UserManagerComponent {
  users!: User[];
  currentUser!: User;

  selected_id = 1;

  constructor(private usersService: UsersService) {
    usersService.users.subscribe((users) => {
      this.users = users;
    });
    usersService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  onUserChange(id: number): void {
    this.usersService.changeCurrentUserToId(id);
  }
}
