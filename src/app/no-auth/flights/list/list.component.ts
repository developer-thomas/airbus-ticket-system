import { Component, inject } from '@angular/core';
import { SelectAirportsComponent } from '../../select-airports/select-airports.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { AiportServiceService } from '../../select-airports/aiport-service.service';
import { CurrencyPipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import * as dayjs from 'dayjs';
import { FlightLocalStorageService } from 'app/auth/flight-local-storage.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SelectAirportsComponent,
    FlightCardComponent,
    NgFor,
    RouterLink,
    NgIf,
    CurrencyPipe,
    NgOptimizedImage,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export default class ListComponent {
  router = inject(Router);
  flights: any[] = [];
  exclusiveFlights: any[] = [];
  sharedFlights: any[] = [];
  
  constructor( private service: AiportServiceService, private flighLCService: FlightLocalStorageService) {}

  ngOnInit(): void {
    this.findExclusiveFlight();
    this.findSharedFlight();
  }

  findExclusiveFlight(
    departureId = '',
    arrivalId = '',
    nearbyPlaces = 'yes',
    date = dayjs().add(1, 'day').format('YYYY-MM-DD'),
    hour = ''
  ) {
    this.service
      .findFlight(departureId, arrivalId, 'Exclusivo', nearbyPlaces, date, hour)
      .subscribe({
        next: (response) => {
          this.exclusiveFlights = response.flights;
        },
      });
  }

  findSharedFlight(
    departureId = '',
    arrivalId = '',
    nearbyPlaces = 'not',
    date = dayjs().add(1, 'day').format('YYYY-MM-DD'),
    hour = ''
  ) {
    this.service
      .findFlight(departureId, arrivalId, 'Assento', nearbyPlaces, date, hour)
      .subscribe({
        next: (response) => {
          this.sharedFlights = response.flights;
        },
      });
  }

  filterByAirports(event: any) {
    const { departureId, arrivalId, nearbyAirports, date, hour } = event;
    this.findExclusiveFlight(
      departureId,
      arrivalId,
      nearbyAirports ? 'yes' : 'not',
      date,
      hour
    );
    this.findSharedFlight(
      departureId,
      arrivalId,
      nearbyAirports ? 'yes' : 'not',
      date,
      hour
    );
  }

  goToFlight(flight: any) {
    if (flight.type == 'Exclusivo') {
      this.router.navigate(['/viagens', flight.id], {
        queryParams: { exclusiveType: 'a negociar' },
      });
      this.flighLCService.saveFight(flight);
    } else {
      this.router.navigate(['/viagens', flight.id]);
    }
  }
}
