import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  user = { username: '', email: '', password: '' };
  success = '';
  error = '';
  
constructor(private auth: AuthService) {} 
onSubmit() {
  console.log('Form submitted', this.user);
  this.auth.register(this.user).subscribe({
    next: (res: any) => {
      this.auth.saveToken(res.token); // stocke le JWT si ton backend renvoie token
      this.success = 'Inscription OK !';
      this.error = '';
      this.user = { username: '', email: '', password: '' };
      
    },
    error: (err) => {
      this.error = 'Erreur lors de l’inscription';
      this.success = '';
    }
  });
}

}
