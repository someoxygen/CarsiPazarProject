import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { OrderStatus } from '../../enums/order-status';

@Component({
  selector: 'app-admin-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-order-list.component.html'
})
export class AdminOrderListComponent implements OnInit {
  orderStatuses = Object.values(OrderStatus);
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (res: any) => this.orders = res
    });
  }

  updateStatus(orderId: number, newStatus: string) {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        alert('Durum güncellendi.');
      },
      error: () => {
        alert('Durum güncellenemedi!');
      }
    });
  }

  deleteOrder(orderId: number) {
    if (!confirm('Bu siparişi silmek istediğinizden emin misiniz?')) return;

    this.orderService.deleteOrder(orderId).subscribe({
      next: () => {
        this.orders = this.orders.filter(o => o.id !== orderId);
        alert('Sipariş silindi.');
      },
      error: () => alert('Sipariş silinemedi!')
    });
  }
}
