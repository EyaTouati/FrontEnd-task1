import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  success = '';
  error = '';

  constructor(private auth: AuthService) {}

onSubmit() {
  this.auth.login(this.credentials).subscribe({
    next: (res: any) => {
      this.auth.saveToken(res.token);  // stocke le JWT
      this.success = 'Login OK !';
      this.error = '';
      this.credentials = { email: '', password: '' };
    },
    error: (err) => {
      this.error = 'Email ou mot de passe incorrect';
      this.success = '';
      this.credentials = { email: '', password: '' };
    }
  });
}

}
