import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://localhost:7042/api/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { productId, quantity });
  }

  updateQuantity(itemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${itemId}`, quantity);
  }

  removeItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${itemId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clear`);
  }
}
