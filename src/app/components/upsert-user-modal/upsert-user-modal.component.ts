import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './upsert-user-modal.component.html',
  styleUrls: ['./upsert-user-modal.component.css']
})
export class UpsertUserModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UpsertUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 'title': string } & Partial<User>,
    private fb: FormBuilder,
  ) {
    this.userForm.patchValue({username: this.data.username});
    this.userForm.patchValue({email: this.data.email});
  }

  userForm: FormGroup = this.fb.group({
    username: ['', [Validators.minLength(5), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
  });

  save() {
    this.dialogRef.close({
      username: this.userForm.get('username').value,
      email: this.userForm.get('email').value,
      id: this.data.id
    });
  }

  cancel() {
    this.dialogRef.close();
  }


}
