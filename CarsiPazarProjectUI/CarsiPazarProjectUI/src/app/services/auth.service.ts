import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://localhost:7042/api/auth';
  public jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded: any = this.jwtHelper.decodeToken(token);
    const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    
    return roleClaim === 'Admin';
  }

  logout() {
    localStorage.removeItem('token');
  }
}
