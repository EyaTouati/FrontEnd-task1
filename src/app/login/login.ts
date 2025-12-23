import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { RouterModule } from '@angular/router'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule ,RouterModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  success = '';
  error = '';

 constructor(private auth: AuthService, private router: Router) {}

onSubmit(form: any) {
  // Validation frontend
  if (form.invalid) {
    this.error = 'Veuillez corriger les erreurs du formulaire';
    this.success = '';
    return; // stop l’envoi
  }

  // Appel backend
  this.auth.login(this.credentials).subscribe({
    next: (res: any) => {
      this.success = 'Connexion réussie';
      this.error = '';
      this.auth.saveToken(res.token); // sauvegarde JWT
      form.resetForm();
      this.router.navigate(['/watchlist']);
    },
    error: (err) => {
      if (err.status === 401) {
        this.error = 'Email ou mot de passe incorrect';
      } else {
        this.error = err.error?.error || 'Erreur lors de la connexion';
      }
      this.success = '';
    }
  });
}


}