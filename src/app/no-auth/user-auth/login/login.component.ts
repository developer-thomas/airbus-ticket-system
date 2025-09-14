import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { SigninCredentials } from '@core/auth/auth';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  private router = inject(Router);
  private auth = inject(AuthService);

  loginForm = new FormGroup({
    credential: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  hide = true;

  login() {
    const user = this.loginForm.value as SigninCredentials;

    this.auth.auth(user).subscribe({
      next: (response) => {
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('phone', response.user.phone);

        const url = sessionStorage.getItem('redirect') || '/plataforma';
        this.router.navigate([url]);
      },
    });
  }

  // navegar para esquecimento de senha
  goToForgotPassword() {
    this.router.navigate(['auth/forgot-password']);
  }


}
