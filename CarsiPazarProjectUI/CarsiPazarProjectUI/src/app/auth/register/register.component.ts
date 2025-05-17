import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: any;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: [''],
      passwordHash: ['']
    });
  }

  onSubmit() {
    this.auth.register(this.registerForm.value).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: () => alert('Kayıt başarısız')
    });
  }
}
