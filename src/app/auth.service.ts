import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private tokenExpirationTimer: any;
  private loggedIn = new BehaviorSubject<boolean>(false);
  router: any;

  constructor() { }

  // Method to handle user login and token retrieval
  login(token: string) {
    localStorage.setItem('token', token);
  }

  // to check whether user is loggedin
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // to retrieve the token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


}
