import {JumpCloudApiService} from './services/jump-cloud-api.service';
import {Component, OnInit} from '@angular/core';
import {DeleteConfirmationModalComponent} from './components/delete-confirmation-modal/delete-confirmation-modal.component';
import {MatDialog} from '@angular/material';
import {Observable, Subscription} from 'rxjs';
import {UpsertUserModalComponent} from './components/upsert-user-modal/upsert-user-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarErrorComponent} from './components/snack-bar-error/snack-bar-error.component';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'jump-cloud-assessment';

  allUsers$: Observable<User[]>;
  columnHeaders = ['username', 'email', 'actions'];

  constructor(
    private jumpCloudApiService: JumpCloudApiService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.allUsers$ = this.jumpCloudApiService.users$.asObservable();
  }

  displayError(message: string): void {
      this.snackbar.openFromComponent(SnackBarErrorComponent, {duration: 5000, data: message});
  }

  deleteUser(user: Omit<User, 'email'>) {
    const deleteUserConfirmationModal = this.dialog.open(
      DeleteConfirmationModalComponent,
      {
        width: '400px',
        data: user.username
      }
    );

    deleteUserConfirmationModal.afterClosed().subscribe((output: boolean) => {
      if (output) {
        this.jumpCloudApiService.deleteUser(user.id).subscribe((updateUserResponse) => {
          if (updateUserResponse.error) {
            this.displayError('Failed to delete user');
          }
        });
      }
    });
  }

  editUser(user: User) {
    const updateUserModal = this.dialog.open(
      UpsertUserModalComponent,
      {
        width: '400px',
        data: {
          username: user.username,
          email: user.email,
          id: user.id,
          title: 'Edit User'
        }
      }
    );

    updateUserModal.afterClosed().subscribe((updatedUser: User) => {
      if (updatedUser) {
        this.jumpCloudApiService.updateUser(updatedUser).subscribe((updateUserResponse) => {
          if (updateUserResponse.error) {
            this.displayError(updateUserResponse.error);
          }
        });
      }
    });
  }

  addUser() {
    const addUserModal = this.dialog.open(
      UpsertUserModalComponent,
      {
        width: '400px',
        data: {title: 'Add User'}
      }
    );

    addUserModal.afterClosed().subscribe((output: Omit<User, 'id'>) => {
      if (output) {
        this.jumpCloudApiService.addUser(output.username, output.email).subscribe((updateUserResponse) => {
          if (updateUserResponse.error) {
            this.displayError(updateUserResponse.error);
          }
        });
      }
    });
  }
}
