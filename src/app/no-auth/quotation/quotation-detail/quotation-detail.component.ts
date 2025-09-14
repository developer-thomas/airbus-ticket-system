import { CurrencyPipe, DatePipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StorageService } from '@core/auth/storage.service';
import { Quotation } from '@core/models/flight.model';
import { ImageCarouselComponent } from '@shared/components/image-carousel/image-carousel.component';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserAuthService } from 'app/auth/user-auth.service';
import { AiportServiceService } from 'app/no-auth/select-airports/aiport-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quotation-detail',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatRadioModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    NgFor,
    SweetAlert2Module,
    DatePipe,
    ImageCarouselComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.scss']
})
export default class QuotationDetailComponent {
  successText = ''
  @ViewChild('confirmSwal')
  public readonly confirSwal!: SwalComponent;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private storageService = inject(StorageService);
  private toastr = inject(ToastrService);
  private userAuthService = inject(UserAuthService)
  @Input() id: string = '';
  @Input() exclusiveType: string = '';
  flight: any;
  flightimages: string[] = [];
  quotations: Quotation[] = [];
  observation = new FormControl(null);

  constructor(private service: AiportServiceService) {
    this.quotations = sessionStorage.getItem('quotations') ? JSON.parse(sessionStorage.getItem('quotations') as string) : [];
    
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
      this.selectAircraft(+this.id);
    });
  }

  setFlightImages(aircraft: any) {
    const aircraftImgs = aircraft.aircraftImgs.map((image: any) => image.image);
    this.flightimages = [aircraft.image, ...aircraftImgs];
  }

  reserve() {
    if (this.storageService.hasToken()) {
      const time = new Date().toISOString().split('T')[1].slice(0, 5);

      const body = {
        value: +this.flight.quotation,
        date: this.flight.departureDate ?? new Date(),
        departureTime: this.flight.departureTime ?? time,
        departureAirportId: this.flight.departureAirport.id,
        arrivalAirportId: this.flight.arrivalAirport.id,
        aircraftId: this.flight.id,
        observation: this.observation.value,
      };

      this.userAuthService.createPersonReserveExclusive(body).subscribe({
        next: (response) => {
          this.successText = response.message
          this.confirSwal.text  = response.message
          this.confirSwal.fire();
        },
      });

    } else {
      sessionStorage.setItem('redirect', this.router.url);
      this.toastr.info('Faça login ou cadastre-se para poder fazer uma reserva!');
      this.router.navigate(['/auth']);
    }
  }

  confirm() {
    this.router.navigate(['plataforma/viagens']);
  }
  openPaymentPage(url: string) {
    window.open(url, '_self');
  }

  selectAircraft(id: number) {
    this.flight = this.quotations.find((quotation: Quotation) => quotation.id === id);
    this.setFlightImages(this.flight);
  }
}
