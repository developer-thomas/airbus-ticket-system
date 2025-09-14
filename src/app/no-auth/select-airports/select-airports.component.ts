import { CommonModule, NgClass, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import * as dayjs from 'dayjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { AiportServiceService, Airport } from './aiport-service.service';
import { ModalSolicitationComponent } from './modal-solicitation/modal-solicitation.component';

@Component({
  selector: 'app-select-airports',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './select-airports.component.html',
  styleUrls: ['./select-airports.component.scss'],
})
export class SelectAirportsComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private service = inject(AiportServiceService);

  airports: Airport[] = [];
  isSearchOrigin = false;
  isSearchDistiny = false;
  hours: string[] = [];
  today = new Date();

  @Input() showFilters = true;
  @Input() departureId!: string;
  @Input() arrivalId!: string;
  @Input() date!: string;
  @Input() hour!: string;

  @Output() handleSelectAirports = new EventEmitter<any>();

  showDepartureAiportsList = false;
  showArrivalAiportsList = false;

  departureAiportId: any;
  arrivalAiportId: any;
  departureAiportFilterControl!: FormControl;
  arrivalAiportFilterControl!: FormControl;
  dateControl!: FormControl;
  hourControl!: FormControl;

  nearbyAirportsControl = new FormControl(false);

  ngOnInit(): void {
    this.createFormControls();
    this.filterDepartureAirportsByCity();
    this.filterArrivalAirportsByCity();
    this.hours = this.generateTimeSlots(dayjs(this.date).toDate());
  }

  private createFormControls() {
    const date = this.date ? dayjs(this.date).toDate() : '';

    this.departureAiportFilterControl = new FormControl(this.departureId ?? '', Validators.required);
    this.arrivalAiportFilterControl = new FormControl(this.arrivalId ?? '', Validators.required);
    this.dateControl = new FormControl(date ?? '');
    this.hourControl = new FormControl(this.hour ?? '');

    if (this.departureId) {
      this.service.findAirportById(+this.departureId).subscribe({
        next: (response) => {
          this.departureAiportFilterControl.setValue(
            `${response.city} - ${response.name} - ( ${
              response.iata ? response.iata + ' , ' : ''
            } ${response.icao})`
          );
          this.departureAiportId = this.departureId;
        },
      });
    }
    if (this.arrivalId) {
      this.service.findAirportById(+this.arrivalId).subscribe({
        next: (response) => {
          this.arrivalAiportFilterControl.setValue(
            `${response.city} - ${response.name} - ( ${
              response.iata ? response.iata + ' , ' : ''
            } ${response.icao})`
          );
          this.arrivalAiportId = this.arrivalId;
        },
      });
    }
  }

  openModalSolicitation() {
    const dialog = this.dialog.open(ModalSolicitationComponent, {
      width: '70vw',
      maxHeight: '100vh',
    });
  }

  filterDepartureAirportsByCity() {
    this.departureAiportFilterControl.valueChanges
      .pipe(
        tap(() => (this.isSearchOrigin = true)),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((city) => {
          if (city) {
            if (!city.includes('(')) {
              this.showDepartureAiportsList = true;
            } else {
              this.showDepartureAiportsList = false;
            }
          } else {
            this.showDepartureAiportsList = false;
          }
        }),
        switchMap((city) => this.service.findAirports(city ? city : ''))
      )
      .subscribe((data) => {
        this.airports = data.airports;
        this.isSearchOrigin = false;
      });
  }

  filterArrivalAirportsByCity() {
    this.arrivalAiportFilterControl.valueChanges
      .pipe(
        tap(() => (this.isSearchDistiny = true)),
        debounceTime(300),
        distinctUntilChanged(),
        tap((city) => {
          if (city) {
            if (!city.includes('(')) {
              this.showArrivalAiportsList = true;
            } else {
              this.showArrivalAiportsList = false;
            }
          } else {
            this.showArrivalAiportsList = false;
          }
        }),
        switchMap((city) => this.service.findAirports(city ? city : ''))
      )
      .subscribe((data) => {
        this.airports = data.airports;
        this.isSearchDistiny = false;
      });
  }

  sort(a: Airport, b: Airport): number {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }

  selectDepartureAiport(airport: any) {
    this.showDepartureAiportsList = false;
    const airportName = `${airport.city} - ${airport.name} - ( ${
      airport.iata ? airport.iata + ' , ' : ''
    } ${airport.icao})`;
    this.departureAiportFilterControl.setValue(airportName);
    this.departureAiportId = airport.id;
  }

  selectArrivalAiport(airport: any) {
    this.showArrivalAiportsList = false;
    const airportName = `${airport.city} - ${airport.name} - ( ${
      airport.iata ? airport.iata + ' , ' : ''
    } ${airport.icao})`;
    this.arrivalAiportFilterControl.setValue(airportName);
    this.arrivalAiportId = airport.id;
  }

  changeAiports() {
    if (
      this.arrivalAiportFilterControl.valid &&
      this.departureAiportFilterControl.valid
    ) {
      const departureAirport = this.departureAiportFilterControl.value;
      const arrivalAirport = this.arrivalAiportFilterControl.value;

      const parseDepartureId = JSON.parse(
        JSON.stringify(this.departureAiportId)
      );
      const parseArrivalId = JSON.parse(JSON.stringify(this.arrivalAiportId));

      this.departureAiportId = parseArrivalId;
      this.arrivalAiportId = parseDepartureId;

      this.departureAiportFilterControl.setValue(arrivalAirport);
      this.arrivalAiportFilterControl.setValue(departureAirport);

      this.search();
    }
  }

  search() {
    this.showDepartureAiportsList = false;
    this.showArrivalAiportsList = false;
    if (
      this.departureAiportFilterControl.valid &&
      this.arrivalAiportFilterControl.valid
    ) {
      const date = this.dateControl.value
        ? dayjs(this.dateControl.value).format('YYYY-MM-DD')
        : '';
      this.handleSelectAirports.emit({
        departureId: this.departureAiportId,
        arrivalId: this.arrivalAiportId,
        date,
        hour: this.hourControl.value,
        nearbyAirports: this.nearbyAirportsControl.value,
      });
    }
  }

  generateTimeSlots(date?: Date) {
    const timeSlots: string[] = [];
    const totalMinutes = 24 * 60;
  
    const targetDate = date ?? new Date();
    const today = new Date();
  
    // Verifica se a data passada é o dia de hoje
    const isToday =
      targetDate.getDate() === today.getDate() &&
      targetDate.getMonth() === today.getMonth() &&
      targetDate.getFullYear() === today.getFullYear();
  
    let startTime = 0;
  
    if (isToday) {
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();
      const startMinutes = Math.ceil(currentMinute / 15) * 15;
      startTime = currentHour * 60 + startMinutes;
    }
  
    for (let minutes = startTime; minutes < totalMinutes; minutes += 15) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const time = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
      timeSlots.push(time);
    }
  
    return timeSlots;
  }
  
  dateChange(event: any) {
    this.hours = this.generateTimeSlots(event.value);
  }
}
