import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JumpCloudApiService {
  users: BehaviorSubject<any> = new BehaviorSubject<any>(this.getUsers());

  constructor(private http: HttpClient) {
  }

  getUsersSubject() {
    return this.users.asObservable();
  }

  getUsers() {
    return this.http.get('/api/systemusers').pipe(
      map((users: any) => users.results)
    );
  }

  addUser(username: string, email: string) {
    const data = {
      op: 'add',
      type: 'system_group',
      username,
      email
    };

    return this.http.post('api/systemusers', data).subscribe(res => {
      this.users.next(this.getUsers());
    });
  }

  deleteUser(id: string) {
    return this.http.delete(`api/systemusers/${id}`).subscribe(() => {
      this.users.next(this.getUsers());
    });
  }

  updateUser(id: string, username: string, email: string) {
    const data = {
      username,
      email,
      op: 'update',
      type: 'system_group'
    };

    return this.http.put(`api/systemusers/${id}`, data).subscribe(() => {
      this.users.next(this.getUsers());
    });
  }
}
