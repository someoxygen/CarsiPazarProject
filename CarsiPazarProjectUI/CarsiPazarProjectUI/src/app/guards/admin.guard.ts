import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const AdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();

  const token = localStorage.getItem('token');

  if (token && !jwtHelper.isTokenExpired(token)) {
    const decoded: any = jwtHelper.decodeToken(token);
    const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    
    if (roleClaim === 'Admin') {
      return true;
    }
  }

  router.navigate(['/auth/login']);
  return false;
};
