import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'app/header/header.component';
import { UserService } from '@core/auth/user.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  service = inject(UserService)
  router = inject(Router)

  logout() {
    this.service.logout()
    this.router.navigate([''])
  }
}
