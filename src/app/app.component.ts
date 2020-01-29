import { JumpCloudApiService } from './services/jump-cloud-api.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jump-cloud-assessment';

  $allUsers: Observable<any>;

  constructor(private jumpCloudApiService: JumpCloudApiService) {
    this.$allUsers = jumpCloudApiService.getUsers();
  }
}
