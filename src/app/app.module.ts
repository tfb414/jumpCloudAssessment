import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteConfirmationModalComponent } from './components/delete-confirmation-modal/delete-confirmation-modal.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatCardModule,
  MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule,
  MatTableModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {UpsertUserModalComponent} from './components/upsert-user-modal/upsert-user-modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SnackBarErrorComponent} from './components/snack-bar-error/snack-bar-error.component';

@NgModule({
  declarations: [AppComponent, DeleteConfirmationModalComponent, UpsertUserModalComponent, SnackBarErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteConfirmationModalComponent, UpsertUserModalComponent, SnackBarErrorComponent]
})
export class AppModule {}
