import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.html'
})
export class ResetPasswordComponent {
  password = '';
  success = '';
  error = '';
  token: string = '';

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.error = 'Veuillez entrer un mot de passe valide';
      this.success = '';
      return;
    }

    this.auth.resetPassword(this.token, this.password).subscribe({
      next: (res: any) => {
        this.success = res.message;
        this.error = '';
        form.resetForm();
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur lors de la réinitialisation';
        this.success = '';
      }
    });
  }
}
