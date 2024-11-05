import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  editUser(user: any): void {
    // Logic to edit user details (could be a new form/modal)
    console.log('Edit user:', user);
  }

  deleteUser(userId: number): void {
    this.usersService.deleteUser(userId).subscribe(response => {
      console.log('User deleted:', response);
      this.loadUsers(); // Refresh user list
    });
  }
}
