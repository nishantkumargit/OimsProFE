import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../user/user';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string;
  apiUrlUser: string;

  constructor(private http: HttpClient) {
    this.apiUrl = '/api/signin';
    this.apiUrlUser = 'http://localhost:8080/user';
  }

 public authenticate(data: any): Observable<any> {
    console.log(this.http);
    return this.http.post<any>(`${this.apiUrl}`, data);
  }


    postData(data: User): Observable<any> {
      return this.http.post<any>(this.apiUrlUser, data);
    }

    getUsersData(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrlUser}`);
    }

    deleteUser(data: any): Observable<void> {
      return this.http.delete<void>(`${this.apiUrlUser}/${data}`);
    }

    getUsersWithOrdersData() {
        return [];
    }

    getUsers() {
        return Promise.resolve(this.getUsersData());
    }

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getUsersWithOrdersData().slice(0, 10));
    }

    getProductsWithOrders() {
        return Promise.resolve(this.getUsersWithOrdersData());
    }

};
