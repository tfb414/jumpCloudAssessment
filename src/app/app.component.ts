import {JumpCloudApiService} from './services/jump-cloud-api.service';
import {Component, OnInit} from '@angular/core';
import {DeleteConfirmationModalComponent} from './components/delete-confirmation-modal/delete-confirmation-modal.component';
import {MatDialog} from '@angular/material';
import {Observable, Subscription} from 'rxjs';
import {UpsertUserModalComponent} from './components/upsert-user-modal/upsert-user-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'jump-cloud-assessment';

  allUsers$: Observable<any>;
  columnHeaders = ['username', 'email', 'actions'];
  modalOutputSubscription: Subscription;

  constructor(
    private jumpCloudApiService: JumpCloudApiService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.allUsers$ = this.jumpCloudApiService.getUsersSubject();
  }

  deleteUser(id: string, username: string) {
    const deleteUserConfirmationModal = this.dialog.open(
      DeleteConfirmationModalComponent,
      {
        width: '400px',
        data: {username}
      }
    );

    this.modalOutputSubscription = deleteUserConfirmationModal.componentInstance.dialogOutput.subscribe(output => {
      if (output) {
        this.jumpCloudApiService.deleteUser(id);
      }
    });

    deleteUserConfirmationModal.afterClosed().subscribe(() => {
      this.modalOutputSubscription.unsubscribe();
    });
  }

  editUser(id: string, username: string, email: string) {
    const editUserModal = this.dialog.open(
      UpsertUserModalComponent,
      {
        width: '400px',
        data: {
          username,
          email,
          id,
          title: 'Edit User'
        }
      }
    );

    this.modalOutputSubscription = editUserModal.componentInstance.dialogOutput.subscribe(output => {
      if (output) {
        this.jumpCloudApiService.updateUser(output.id, output.username, output.email);
      }
    });

    editUserModal.afterClosed().subscribe(() => {
      this.modalOutputSubscription.unsubscribe();
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

    this.modalOutputSubscription = addUserModal.componentInstance.dialogOutput.subscribe(output => {
      if (output) {
        this.jumpCloudApiService.addUser(output.username, output.email);
      }
    });
  }
}
