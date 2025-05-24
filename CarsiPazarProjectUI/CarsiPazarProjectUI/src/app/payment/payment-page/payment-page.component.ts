import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {
  cardNumber = '';
  expiry = '';
  cvc = '';
  error = '';
  loading = false;
  paymentMethod: 'kart' | 'nakit' = 'kart';

  constructor(private orderService: OrderService, private router: Router) {}

  submitPayment() {
    this.error = '';

    if (this.paymentMethod === 'kart') {
      // basit kart validasyonu
      if (!this.cardNumber.match(/^\d{16}$/)) {
        this.error = '16 haneli geçerli bir kart numarası girin.';
        return;
      }

      if (!this.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
        this.error = 'Geçerli bir son kullanma tarihi girin. (MM/YY)';
        return;
      }

      if (!this.cvc.match(/^\d{3}$/)) {
        this.error = 'Geçerli bir CVC girin (3 haneli).';
        return;
      }
    }

    this.loading = true;

    setTimeout(() => {
      this.orderService.createOrder().subscribe({
        next: (res: any) => {
          this.loading = false;
          this.router.navigate(['/thank-you'], { queryParams: { id: res.orderId } });
        },
        error: () => {
          this.loading = false;
          this.error = 'Ödeme başarısız oldu.';
        }
      });
    }, 1000);
  }
}
