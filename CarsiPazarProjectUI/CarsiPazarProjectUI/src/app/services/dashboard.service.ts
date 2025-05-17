import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private baseUrl = 'https://localhost:7042/api/dashboard';

  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get(`${this.baseUrl}/stats`);
  }
}
