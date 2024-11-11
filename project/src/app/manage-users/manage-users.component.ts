import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.usersService.getUsers().subscribe(
      (response) => {
        console.log('Raw response:', response);
        if (response && response.length > 0) {
          this.users = response; // Directly assign the response as it's already an array of users
          console.log('Fetched Users:', this.users);
        } else {
          console.error('Error fetching users: No users found.');
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  
  openEditForm(user: any): void {
    this.selectedUser = { ...user }; // Create a copy of the user for editing
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.usersService.updateUser(this.selectedUser).subscribe(
        (response) => {
          if (response.status === 'success') {
            // Update the users list with new data
            this.fetchUsers();
            this.selectedUser = null; // Close the edit form
          } else {
            console.error('Error updating user:', response.message);
          }
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user? This will mark the user as inactive.')) {
      this.usersService.softDeleteUser(userId).subscribe(
        (response:any) => {
          if (response.status === 'success') {
            console.log('User marked as inactive successfully.');
            // Reload the users list after deletion
            this.fetchUsers();
          } else {
            console.error('Error deleting user:', response.message);
          }
        },
        (error:any) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.selectedUser = null;
  }
}
