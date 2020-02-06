import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JumpCloudApiService} from '../../services/jump-cloud-api.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './upsert-user-modal.component.html',
  styleUrls: ['./upsert-user-modal.component.css']
})
export class UpsertUserModalComponent {

  @Output() dialogOutput: EventEmitter<Partial<User>> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<UpsertUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private jumpCloudApiService: JumpCloudApiService,
  ) {
    this.userForm.patchValue({username: this.data.username});
    this.userForm.patchValue({email: this.data.email});
  }

  userForm: FormGroup = this.fb.group({
    username: ['', Validators.minLength(5)],
    email: ['', Validators.email],
  });

  save() {
    this.dialogOutput.emit({username: this.userForm.get('username').value, email: this.userForm.get('email').value, id: this.data.id});
    // this.jumpCloudApiService.updateUser(this.data.id, this.data.username, this.data.email);
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }


}
