import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoAuthService } from '@core/services/noAuth/no-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmate-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confirmate-code.component.html',
  styleUrls: ['./confirmate-code.component.scss']
})
export class ConfirmateCodeComponent {
  private fb = inject(FormBuilder);
  private noAuthService = inject(NoAuthService);
  private toastr = inject(ToastrService);

  public form!: FormGroup;
  
  maxLength: number = 6;
  passwordMinLength: number = 8;

  constructor() {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(6)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  onSubmit() {
    const { code, password, confirmPassword } = this.form.value;
    const data = { code, password, confirmPassword };
    console.log(data)
    if(this.form.valid) {
      this.noAuthService.resetPassword(data).subscribe({
        next: (_) => {
          this.toastr.success("Senha alterada com sucesso!")
        }
      })
    }
  }
}
