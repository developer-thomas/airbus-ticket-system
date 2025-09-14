import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AiportServiceService } from 'app/no-auth/select-airports/aiport-service.service';
import { ViacepService } from 'app/no-auth/user-auth/register/viacep.service';
import { NgxMaskDirective } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    //NgOptimizedImage,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export default class ProfileComponent {
  filePath: string = '';
  hide = true;
  fb = inject(FormBuilder);
  router = inject(Router);
  userForm!: FormGroup;

  constructor(
    private service: AiportServiceService,
    private authService: UserAuthService,
    private viacepService: ViacepService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.buildForms();
    this.selfUser();
  }

  buildForms() {
    this.userForm = this.fb.group({
      image: [''],
      imageKey: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      whatsapp: ['', Validators.required],
      password: [''],
      confirmPassword: [''],
      zipCode: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  uploadFile(event: Event) {
    const image = this.userForm.get('image');
    const imageKey = this.userForm.get('imageKey');

    const file = (event.target as HTMLInputElement).files![0];

    this.service.uploadFile(file).subscribe({
      next: (response) => {
        this.filePath = response.file;

        image?.patchValue(response.file);
        imageKey?.patchValue(response.fileKey);
      },
    });
  }

  selfUser() {
    this.authService.selfUser().subscribe({
      next: (response) => {
        this.userForm.patchValue(response);
        this.userForm.patchValue(response.address);
        this.filePath = response.image;
      },
    });
  }

  submitUser() {
    if (this.userForm.invalid) {
      this.toastr.warning('Preencha todos os campos corretamente!');
      return;
    }

    const user = this.userForm.value;

    this.authService.updateUserProfile(user).subscribe({
      next: (response) => {
        console.log('Resposta da API (sucesso):', response);
        this.toastr.success('Perfil atualizado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao atualizar perfil:', err);
        this.toastr.error('Erro ao atualizar perfil.');
      },
    });
  }

  getCepInfos(event: Event) {
    const cep = (event.target as HTMLInputElement).value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  
    if (cep.length === 8) { // Verifica se o CEP tem 8 caracteres
      this.viacepService.getCep(cep).subscribe({
        next: (res) => {
          if (res.erro) {
            this.toastr.error('CEP inválido. Endereço não encontrado.');
            return;
          }
  
          this.userForm.get('street')?.patchValue(res.logradouro);
          this.userForm.get('complement')?.patchValue(res.complemento);
          this.userForm.get('city')?.patchValue(res.localidade);
          this.userForm.get('state')?.patchValue(res.uf);
          this.userForm.get('country')?.patchValue(res.bairro);
        },
        error: () => {
          this.toastr.error('Erro ao buscar CEP.');
        }
      });
    } else {
      this.toastr.warning('CEP deve ter exatamente 8 caracteres.');
    }
  }
  
}
