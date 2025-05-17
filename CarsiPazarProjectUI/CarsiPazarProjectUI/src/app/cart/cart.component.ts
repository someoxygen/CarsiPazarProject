import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: any;
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cart.items?.reduce((sum: number, item: any) =>
      sum + item.product.price * item.quantity, 0);
  }

  updateQuantity(item: any, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    if (isNaN(quantity) || quantity < 1) return;

    this.cartService.updateQuantity(item.id, quantity).subscribe(() => this.loadCart());
  }

  removeItem(itemId: number) {
    this.cartService.removeItem(itemId).subscribe(() => this.loadCart());
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => this.loadCart());
  }
  goToProducts() {
  this.router.navigate(['/products']);
}
}

