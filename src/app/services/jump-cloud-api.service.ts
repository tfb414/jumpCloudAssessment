import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, publishReplay, refCount, shareReplay, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class JumpCloudApiService {
  usersUpdated$: Subject<boolean> = new Subject<boolean>();
  users$ = new Subject<User[]>();

  constructor(private http: HttpClient) {
    this.usersUpdated$.subscribe(() => {
      this.getUsers().subscribe();
    });
    this.getUsers().subscribe();
  }

  getUsers(): Observable<User[]> {
    return this.http.get('/api/systemusers').pipe(
      map((users: any) => users.results.map(
        user => {
          return {
            username: user.username,
            email: user.email,
            id: user.id
          };
        }
      )),
      tap(users => this.users$.next(users)));
  }

  addUser(username: string, email: string) {
    const data = {
      op: 'add',
      type: 'system_group',
      username,
      email
    };

    return this.http.post('api/systemusers', data)
      .pipe(tap(() => this.usersUpdated$.next()), catchError(error => {
        return of(error);
      }));
  }

  deleteUser(id: string) {
    return this.http.delete(`api/systemusers/${id}`)
      .pipe(tap(() => this.usersUpdated$.next()), catchError(error => {
        return of(error);
      }));
  }

  updateUser(user: User) {
    const data = {
      username: user.username,
      email: user.email,
      op: 'update',
      type: 'system_group'
    };

    return this.http.put(`api/systemusers/${user.id}`, data)
      .pipe(tap(() => this.usersUpdated$.next()), catchError(error => {
        return of(error);
      }));
  }
}
