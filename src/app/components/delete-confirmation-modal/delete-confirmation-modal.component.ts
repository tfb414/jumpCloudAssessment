import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent {

  @Output() dialogOutput: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm() {
    console.log('confirm');
    this.dialogOutput.emit(true);
    this.dialogRef.close();

  }

  cancel() {
    console.log('cancel');
    this.dialogOutput.emit(false);
    this.dialogRef.close();
  }
}
