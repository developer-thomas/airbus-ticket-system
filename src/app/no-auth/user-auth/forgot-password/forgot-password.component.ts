import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoAuthService } from '@core/services/noAuth/no-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private noAuthService = inject(NoAuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  public form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    const { email } = this.form.value;

    if(this.form.valid) {
      this.noAuthService.forgotPassword(email).subscribe({
        next: (_) => {
          this.toastr.success('Código de recuperação enviado para o e-mail.')
          this.router.navigate(['/auth/reset-password']);
        }
      })
    }
  }
}
