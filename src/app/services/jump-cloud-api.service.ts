import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
