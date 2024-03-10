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

  selected_user_id = 1;

  constructor(private usersService: UsersService) {
    usersService.getUsers().then(() => {
      this.users = usersService.users;
      this.selected_user_id = -1;
      this.currentUser = this.usersService.currentUser.value;
    });
    usersService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  onUserChange(user_id: number): void {
    this.usersService.changeCurrentUserToId(user_id);
  }
}
