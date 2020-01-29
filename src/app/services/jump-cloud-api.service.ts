import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class JumpCloudApiService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('/api/systemusers');
  }

  getUser(id: string) {
    return this.http.get(`api/systemusers/${id}`);
  }

  addUser(user: Omit<User, 'id'>) {
    const data = {
      op: 'add',
      type: 'system_group',
      username: user.username,
      email: user.email
    };

    return this.http.post('api/systemusers', data);
  }

  deleteUser(id: string) {
    return this.http.delete(`api/systemuser/${id}`);
  }

  updateUser(user: User) {
    const data = {
      username: user.username,
      email: user.email,
      op: 'update',
      type: 'system_group'
    };

    return this.http.put(`api/systemusers/${user.id}`, data);
  }
}
