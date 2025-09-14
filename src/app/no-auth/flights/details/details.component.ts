import { Component, Input, ViewChild, inject } from '@angular/core';
import { AiportServiceService } from '../../select-airports/aiport-service.service';
import { CurrencyPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '@core/auth/storage.service';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'app/auth/user-auth.service';
import { FlightLocalStorageService } from 'app/auth/flight-local-storage.service';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatRadioModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    NgIf,
    SweetAlert2Module,
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export default class DetailsComponent {
  successText = ''
  @ViewChild('confirmSwal')
  public readonly confirSwal!: SwalComponent;
  router = inject(Router);
  route = inject(ActivatedRoute);
  storageService = inject(StorageService);
  toastr = inject(ToastrService);
  userAuthService = inject(UserAuthService);
  flighLCService = inject(FlightLocalStorageService);
  value = 0;
  quantity = 0;
  show = false;
  count = 0;
  type = '';
  @Input() id: string = '';
  @Input() exclusiveType: string = '';
  flight: any;
  constructor(private service: AiportServiceService) {}

  ngOnInit(): void {
    if (this.exclusiveType) {
      this.flight = JSON.parse(this.flighLCService.getFlight());
    } else {
      this.findFlight();
    }
  }

  findFlight() {
    this.service.findFlightById(Number(this.id)).subscribe({
      next: (response) => {
        this.flight = response;
      },
    });
  }

  selectType(type: string, value: number, quantity: number) {
    this.type = type;
    if (this.count >= 1) this.count = 0;
    this.show = true;
    this.value = value;
    this.quantity = quantity;
  }

  add() {
    this.count++;
    this.quantity--;
  }

  remove() {
    this.count--;
    this.quantity++;
  }

  reserve() {
    if (this.type == 'luggage') {
      if (this.storageService.hasToken()) {
        this.router.navigate(['/plataforma/objetos/novo/adicionar-objeto']);
      } else {
        this.toastr.info(
          'Faça login ou cadastre-se para poder fazer uma reserva!'
        );
        this.router.navigate(['/auth']);
      }
    } else {
      if (this.storageService.hasToken()) {
        if (this.flight.type == 'Compartilhado') {
          this.router.navigate(['adicionar-passageiros'], {
            relativeTo: this.route,
            queryParams: { type: 'Pessoa', amountPeople: this.count },
          });
        } else {
          if (!this.exclusiveType) {
            const body = {
              value: +this.flight.value,
              date: (this.flight.date as string).split('/').reverse().join('/'),
              departureTime: this.flight.departureTime,
              flightExists: true,
              departureAirportId: this.flight.departureAirport.id,
              arrivalAirportId: this.flight.arrivalAirport.id,
              aircraftId: this.flight.aircraft.id,
              flightId: Number(this.id),
            };
            this.userAuthService.createPersonReserveExclusive(body).subscribe({
              next: (response) => {
                this.successText = response.message
                this.confirSwal.text  = response.message
                this.confirSwal.fire();
              },
            });
          } else {
            const body = {
              value: +this.flight.value,
              date: (this.flight.date as string).split('/').reverse().join('/'),
              departureTime: this.flight.departureTime,
              flightExists: false,
              departureAirportId: this.flight.departureAirport.id,
              arrivalAirportId: this.flight.arrivalAirport.id,
              aircraftId: this.flight.aircraft.id,
            };
            this.userAuthService.createPersonReserveExclusive(body).subscribe({
              next: (response) => {
                this.successText = response.message
                this.confirSwal.text  = response.message
                this.confirSwal.fire();
              },
            });
          }
        }
      } else {
        this.toastr.info(
          'Faça login ou cadastre-se para poder fazer uma reserva!'
        );
        this.router.navigate(['/auth']);
      }
    }
  }

  confirm() {
    this.router.navigate(['plataforma/viagens']);
  }
  openPaymentPage(url: string) {
    window.open(url, '_self');
  }
}
