import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UploadService } from '@core/services/upload.service';
import { of } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserAuthService } from 'app/auth/user-auth.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-flight-companions',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    NgxMaskDirective,
  ],
  templateUrl: './flight-companions.component.html',
  styleUrls: ['./flight-companions.component.scss'],
})
export default class FlightCompanionsComponent implements OnInit {
  fb = inject(FormBuilder);
  uploadService = inject(UploadService);
  userAuthService = inject(UserAuthService);
  @Input() id: string = '';
  @Input() type: string = '';
  passengersArray: any[] = [];
  @Input() amountPeople: string = '';
  flightForm!: FormGroup;

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      passengers: this.fb.array([]),
    });
    for (let i = 0; i < Number(this.amountPeople); i++) {
      this.passengers.push(
        this.fb.group({
          name: ['', Validators.required],
          cpf: ['', Validators.required],
          birthday: ['', Validators.required],
          passengerDocuments: [[]],
        })
      );
    }
  }

  get passengers(): any {
    return this.flightForm.get('passengers') as FormArray<any>;
  }

  addDocument(event: Event, index: number) {
    const files = (event.target as HTMLInputElement).files as FileList;
    Object.values(files).map((file) => {
      this.uploadService.uploadFile(file).subscribe({
        next: (response) => {
          console.log(response);

          this.passengers.at(index).get('passengerDocuments')?.value.push({
            image: response.file,
            imageKey: response.fileKey,
            name: response.name,
          });
        },
      });
    });
  }

  removeDocument(passengerIndex: number, documentT: any): void {
    const documentIndex = this.passengers
      .at(passengerIndex)
      .get('passengerDocuments')
      .value.findIndex((t: any) => t.file === documentT.file);

    this.passengers
      .at(passengerIndex)
      .get('passengerDocuments')
      .value.splice(documentIndex, 1);
  }

  sendPayment() {
    const body = {
      type: 'Pessoa',
      flightId: Number(this.id),
      amountPeople: Number(this.amountPeople),
      passengers: this.passengers.value,
    };
    body.passengers.map((t: any) => {
      t.birthday = t.birthday.split('/').reverse().join('-');
    });

    this.userAuthService.createPersonReserve(body).subscribe({
      next: (response) => {
        this.openPaymentPage(response.url);
      },
    });
  }

  openPaymentPage(url: string) {
    window.open(url, '_self');
  }
}
