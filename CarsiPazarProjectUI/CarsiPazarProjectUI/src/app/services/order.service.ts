import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDto } from '../models/order-dto';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = 'https://localhost:7042/api/order';

  constructor(private http: HttpClient) {}

  createOrder() {
    return this.http.post(`${this.baseUrl}/create`, {});
  }

  getMyOrders() {
    return this.http.get(`${this.baseUrl}`);
  }

  getAllOrders() {
    return this.http.get(`${this.baseUrl}/all`);
  }

  updateOrderStatus(orderId: number, status: string) {
    console.log(status);
    return this.http.put(`https://localhost:7042/api/order/${orderId}/status`, { status }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteOrder(orderId: number) {
    return this.http.delete(`https://localhost:7042/api/order/${orderId}`);
  }

  getOrderById(id: number) {
    return this.http.get<OrderDto>(`https://localhost:7042/api/order/${id}`);
  }
}
