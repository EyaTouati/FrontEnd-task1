import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],  // juste RouterModule pour router-outlet et routerLink
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
