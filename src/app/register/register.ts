import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  user = { username: '', email: '', password: '' };
  success = '';
  error = '';
  
constructor(private auth: AuthService) {} 
onSubmit(form: any) {
  // ✅ Validation frontend (HTML + Angular)
  if (form.invalid) {
    this.error = 'Veuillez corriger les erreurs du formulaire';
    this.success = '';
    return; // stop l’envoi
  }

  // ✅ Appel backend
  this.auth.register(this.user).subscribe({
    next: (res: any) => {
      this.success = 'Inscription réussie';
      this.error = '';
      this.user = { username: '', email: '', password: '' };
      form.resetForm(); // reset du formulaire
    },
    error: (err) => {
      // ✅ Validation backend
      if (err.status === 409 && err.error?.error === 'Email already exists') {
        this.error = 'Cet email est déjà utilisé';
      } else if (err.status === 400 && err.error?.error) {
        // autres erreurs backend (ex: champs manquants, email invalide)
        this.error = err.error.error;
      } else {
        // erreur générale
        this.error = 'Erreur lors de l’inscription';
      }
      this.success = '';
    }
  });
}



}