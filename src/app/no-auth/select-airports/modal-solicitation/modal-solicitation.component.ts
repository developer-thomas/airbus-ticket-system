import { JsonPipe, NgFor } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { City, NoAuthAirport, NoAuthService } from '@core/services/noAuth/no-auth.service';
import { CityAutoCompleteComponent } from '@shared/components/city-auto-complete/city-auto-complete.component';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxMaskDirective } from 'ngx-mask';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AiportServiceService } from '../aiport-service.service';
import { sortCities } from './sort-cities';
@Component({
  standalone: true,
  selector: 'app-modal-solicitation',
  templateUrl: './modal-solicitation.component.html',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    NgxMaskDirective,
    CityAutoCompleteComponent,
    NgFor,
    JsonPipe
  ],
})
export class ModalSolicitationComponent implements OnInit {
  private readonly service = inject(AiportServiceService);
  private readonly toastr = inject(ToastrService);
  private readonly spinner = inject(NgxSpinnerService)
  private readonly noAuthService = inject(NoAuthService);

  email = localStorage.getItem('email') ?? '';
  phone = localStorage.getItem('phone') ?? '';
  solicitationForm = new FormGroup({
    quantity: new FormControl('', Validators.required),
    dimensions: new FormControl('', Validators.required),
    approximateWeight: new FormControl('', Validators.required),
    approximateTotalWeight: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    observation: new FormControl(''),
    email: new FormControl(this.email, Validators.required),
    phone: new FormControl(this.phone, Validators.required),
    departureCity: new FormControl(''),
    departureAirport: new FormControl('', Validators.required),
    departureDate:  new FormControl('', Validators.required),
    departureTime: new FormControl('', Validators.required),
    arrivalCity: new FormControl(''),
    arrivalAirport: new FormControl('', Validators.required),
  });

  departureCityFilter = '';
  arrivalCityFilter = '';
  cities: City[] = [];
  departureAirports: NoAuthAirport[] = [];
  arrivalAirports: NoAuthAirport[] = [];
  allAirports: NoAuthAirport[] = [];

  @ViewChild('confirmSwal', { static: true })
  public readonly confirSwal!: SwalComponent;
  text: string = '';
  icon: 'error' | 'success' = 'success';
 

  ngOnInit(): void {
    this.findAirportsAndCities();
  }

  findAirportsAndCities() {
    this.noAuthService.findAirportsAndCities().subscribe({
      next: (response) => {
        this.cities = response.cities.sort((x, y) => sortCities(x, y));

        this.departureAirports = response.airports;
        this.arrivalAirports = response.airports;
        this.allAirports = response.airports;
        this.filterAirportsByCity(this.departureCityFilter, 'departure');
        this.filterAirportsByCity(this.arrivalCityFilter, 'arrival');
      },
    });
  }

  sendSolicitation() {
    this.spinner.show();
    this.service.sendSolicitation(this.solicitationForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Realizaremos a sua cotação e em breve retornaremos.');
        this.solicitationForm.reset();
        this.spinner.hide();
      },
    });
  }

  filterAirportsByCity(city: string, type: string) {
    if (type == 'departure') {
      this.departureAirports = this.filterAirports(
        this.departureAirports,
        city,
        'departureAirportId'
      );
      this.solicitationForm.get('departureCity')?.patchValue(city);
    } else {
      this.arrivalAirports = this.filterAirports(
        this.arrivalAirports,
        city,
        'arrivalAirportId'
      );
      this.solicitationForm.get('arrivalCity')?.patchValue(city);
    }
  }

  filterAirports(
    airPorts: NoAuthAirport[],
    city: string,
    control: string
  ): NoAuthAirport[] {
    this.solicitationForm.get(control)?.enable();
    if (airPorts.length !== this.allAirports.length) airPorts = this.allAirports;
    return airPorts.filter((airport) => airport.city?.includes(city));
  }
}
