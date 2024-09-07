import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
  class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (localStorage.getItem("token")) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  }

  export const PermissionGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(AuthGuard).canActivate(next, state);
  }
