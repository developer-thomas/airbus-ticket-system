import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
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
import { NgxMaskDirective } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { AiportServiceService } from '../../select-airports/aiport-service.service';
import { ViacepService } from './viacep.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export default class RegisterComponent implements OnInit {
  private service = inject(AiportServiceService);

  filePath: string = '';
  fb = inject(FormBuilder);
  router = inject(Router);
  toastr = inject(ToastrService);
  viacepService = inject(ViacepService);

  userForm!: FormGroup;
  companyForm!: FormGroup;

  step = 1;
  hide = true;
  type = 'company';

  ngOnInit(): void {
    this.buildForms();
  }

  register(type: string) {
    this.type = type;
    this.step++;
  }

  buildForms() {
    this.userForm = this.fb.group({
      image: [null],
      imageKey: [null],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      whatsapp: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      zipCode: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });

    this.companyForm = this.fb.group({
      offerFlights: [true, Validators.required],
      searchFlights: [true, Validators.required],
      image: [null, Validators.required],
      imageKey: [null, Validators.required],
      name: ['', Validators.required],
      managerName: ['', Validators.required],
      managerDocument: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      coa: ['', Validators.required],
      document: ['', Validators.required],
      companyDocuments: this.fb.array([]),
      commercialPhone: ['', Validators.required],
      cellPhone: ['', Validators.required],
      acceptWhatsappMessages: [false],
      phoneOnCall: ['', Validators.required],
      zipCode: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  get documents() {
    return this.companyForm.get('companyDocuments') as FormArray;
  }

  getCepInfos(event: Event) {
    const cep = (event.target as HTMLInputElement).value;

    if (cep) {
      this.viacepService.getCep(cep.replace('-', '')).subscribe({
        next: (res) => {
          if (res.erro) {
            this.toastr.error('CEP inválido. Endereço não encontrado.');
          }

          if (this.type === 'company') {
            this.companyForm.get('street')?.patchValue(res.logradouro);
            this.companyForm.get('complement')?.patchValue(res.complemento);
            this.companyForm.get('city')?.patchValue(res.localidade);
            this.companyForm.get('state')?.patchValue(res.uf);
            this.companyForm.get('country')?.patchValue(res.bairro);
          } else {
            this.userForm.get('street')?.patchValue(res.logradouro);
            this.userForm.get('complement')?.patchValue(res.complemento);
            this.userForm.get('city')?.patchValue(res.localidade);
            this.userForm.get('state')?.patchValue(res.uf);
            this.userForm.get('country')?.patchValue(res.bairro);
          }
        },
      });
    }
  }

  uploadFile(event: Event) {
    let image: AbstractControl<any, any> | null;
    let imageKey: AbstractControl<any, any> | null;


    if (this.type === 'company') {
      image = this.companyForm.get('image');
      imageKey = this.companyForm.get('imageKey');
    }
    /*if (this.type == 'company') {
      image = this.companyForm.get('image');
      imageKey = this.companyForm.get('imageKey');
    } else {
      image = this.userForm.get('image');
      imageKey = this.userForm.get('imageKey');
    }*/

    const file = (event.target as HTMLInputElement).files![0];

    this.service.uploadFile(file).subscribe({
      next: (response) => {
        this.filePath = response.file;

        image?.patchValue(response.file);
        imageKey?.patchValue(response.fileKey);
      },
    });
  }

  uploadDocuments(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];

    this.service.uploadFile(file).subscribe({
      next: (response) => {
        this.documents.push(
          this.fb.group({
            image: response.file,
            imageKey: response.fileKey,
          })
        );
      },
    });
  }

  submitCompany() {
    const company = this.companyForm.value;
    company.zipCode = company.zipCode.replace('-', '');
    this.service.registerUser(company).subscribe({
      next: () => {
        this.router.navigate(['/auth']);
        this.toastr.success('Cadastro realizado com sucesso!');
      },
    });
  }

  submitUser() {
    const user = this.userForm.value;
    user.zipCode = user.zipCode.replace('-', '');
    this.service.registerUser(user).subscribe({
      next: () => {
        localStorage.setItem('email', this.userForm.get('email')?.value);
        localStorage.setItem('phone', this.userForm.get('phone')?.value);
        this.toastr.success('Cadastro realizado com sucesso!');

        const url = sessionStorage.getItem('redirect') || '/auth';
        this.router.navigate([url]);
      },
    });
  }
}
