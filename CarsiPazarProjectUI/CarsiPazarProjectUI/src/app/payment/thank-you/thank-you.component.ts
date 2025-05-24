import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderDto } from '../../models/order-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  order: OrderDto | null = null;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const orderId = params['id'];
      if (orderId) {
        this.orderService.getOrderById(orderId).subscribe({
          next: (res : any) => this.order = res,
          error: () => this.order = null
        });
      }
    });
  }
}
