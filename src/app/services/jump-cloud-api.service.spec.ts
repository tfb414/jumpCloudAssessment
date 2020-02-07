import {fakeAsync, flush, TestBed} from '@angular/core/testing';

import {JumpCloudApiService} from './jump-cloud-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';

describe('JumpCloudApiService', () => {
  let service: JumpCloudApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(JumpCloudApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getUsers', () => {
    it('should return a list of Users', () => {
      const response = {
        results: [
          {
            id: '123',
            email: 'test@test.com',
            username: 'testy mcTestFace'
          }
        ]
      };

      service.getUsers().subscribe((res) => {
        expect(res).toEqual(response.results);
      });
      const reqs = httpTestingController.match('/api/systemusers');
      // testing the 2nd element because I am calling getUsers in the constructor
      reqs[1].flush(response);
    });

    it('should call users$.next with the user payload', () => {
      const response = {
        results: [
          {
            id: '123',
            email: 'test@test.com',
            username: 'testy mcTestFace'
          }
        ]
      };

      service.users$.asObservable().subscribe(val => {
        expect(val).toEqual(response.results);
      });

      service.getUsers().subscribe();

      const reqs = httpTestingController.match('/api/systemusers');
      reqs[0].flush(response);
    });
  });
  describe('deleteUser', () => {
    it('should make a delete request with the passed in id', () => {
      const id = '123';
      const response = {yes: true};

      service.deleteUser(id).subscribe(res => {
        expect(res).toEqual(response);
      });

      const req = httpTestingController.expectOne(`api/systemusers/${id}`);

      req.flush(response);
    });

    it('should trigger usersUpdated$ subject on the response', () => {
      const id = '123';
      const response = {yes: true};
      spyOn(service.usersUpdated$, 'next');

      service.deleteUser(id).subscribe();

      const req = httpTestingController.expectOne(`api/systemusers/${id}`);

      req.flush(response);

      expect(service.usersUpdated$.next).toHaveBeenCalled();
    });

    // it('should throw the error', () => {
    //   const id = '123';
    //   const response = new ErrorEvent('warning will robinson', {error: 'bad'});
    //
    //   service.deleteUser(id).subscribe(
    //     (res) => {console.log(res)},
    //     (error) => {
    //       console.log(error);
    //       expect(true).toEqual(false);
    //       expect(response).toEqual(error);
    //     },
    //   );
    //
    //   const req = httpTestingController.expectOne(`api/systemusers/${id}`);
    //
    //   req.error(response, {status: 400, statusText: ''});
    // });
  });
});
