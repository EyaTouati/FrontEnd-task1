import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.html'
})
export class ForgotPasswordComponent {
  email = '';
  success = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.error = 'Veuillez entrer un email valide';
      this.success = '';
      return;
    }

    this.auth.forgotPassword(this.email).subscribe({
      next: (res: any) => {
        this.success = res.message;
        this.error = '';
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur lors de la demande';
        this.success = '';
      }
    });
  }
}
