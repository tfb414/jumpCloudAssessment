import { Component, Input } from '@angular/core';
import { User } from '../../user';
import { JumpCloudApiService } from '../../services/jump-cloud-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user: User;

  constructor(private jumpCloudApiService: JumpCloudApiService) {}

  deleteUser() {
    // this.jumpCloudApiService.deleteUser(this.user.id);
    console.log('deleted', this.user.id);
  }

  editUser() {
    console.log('edit', this.user.id);
  }
}
