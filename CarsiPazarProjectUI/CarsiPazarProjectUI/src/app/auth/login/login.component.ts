import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: any;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      passwordHash: ['']
    });
  }

  onSubmit() {
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.auth.setToken(res.token);

        const token = res.token;
        const decoded: any = this.auth.jwtHelper.decodeToken(token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/products']);
        }
      },
      error: () => alert('Giriş başarısız')
    });
  }

}
