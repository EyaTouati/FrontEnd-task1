import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  template: `<h1>Test Angular</h1>
             <app-login></app-login>
             <app-register></app-register>`
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}

