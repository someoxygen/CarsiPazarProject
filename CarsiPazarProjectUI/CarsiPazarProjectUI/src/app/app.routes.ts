import { AdminGuard } from './guards/admin.guard';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AdminGuard] },
  { path: 'admin/products/edit/:id', component: ProductFormComponent, canActivate: [AdminGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];
