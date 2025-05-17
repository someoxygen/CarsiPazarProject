import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);

  products: any[] = [];

  ngOnInit() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    if (!confirm('Ürünü silmek istediğine emin misin?')) return;

    this.productService.delete(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
    });
  }

  goToAdd() {
    this.router.navigate(['/admin/products/new']);
  }

  goToEdit(id: number) {
    this.router.navigate(['/admin/products/edit', id]);
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId).subscribe(() => alert('Sepete eklendi!'));
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
