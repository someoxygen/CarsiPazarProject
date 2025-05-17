import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://localhost:7042/api/product'; // .NET Core API adresin

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }

  update(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  uploadImage(formData: FormData) {
    return this.http.post('https://localhost:7042/api/image/upload', formData);
  }

}
