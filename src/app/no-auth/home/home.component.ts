import { CurrencyPipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { FlightLocalStorageService } from 'app/auth/flight-local-storage.service';
import { HeaderComponent } from 'app/header/header.component';
import * as dayjs from 'dayjs';
import { AiportServiceService } from '../select-airports/aiport-service.service';
import { ModalSolicitationComponent } from '../select-airports/modal-solicitation/modal-solicitation.component';
import { SelectAirportsComponent } from '../select-airports/select-airports.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SelectAirportsComponent,
    NgFor,
    CurrencyPipe,
    NgOptimizedImage,
    RouterLink,
    NgIf,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    ModalSolicitationComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent implements OnInit {
  router = inject(Router);
  flights: any[] = [];
  exclusiveFlights: any[] = [];
  sharedFlights: any[] = [];

  travelToolTip = 'Explicação do módulo viagens'
  luggageToolTip = 'Explicação do módulo cargas.'

  constructor(
    private service: AiportServiceService,
    private flighLCService: FlightLocalStorageService
  ) {}

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
          this.prepareFlightInstructions(this.exclusiveFlights);
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
          this.prepareFlightInstructions(this.sharedFlights);
        },
      });
  }

  prepareFlightInstructions(flights: any[]) {
    flights.forEach(flight => {
      // Prepare boarding instructions
      flight.boardingInstructions = `Apresente-se no aeroporto ${flight.departureAirport.name} (${flight.departureAirport.iata || ''}) com 1 hora de antecedência. Dirija-se ao terminal de aviação executiva.`;
      
      if (flight.departureAirport.additionalInfo) {
        flight.boardingInstructions += ` ${flight.departureAirport.additionalInfo}`;
      }
      
      // Prepare disembarking instructions
      flight.disembarkingInstructions = `Ao chegar no aeroporto ${flight.arrivalAirport.name} (${flight.arrivalAirport.iata || ''}), siga as orientações da tripulação para desembarque.`;
      
      if (flight.arrivalAirport.additionalInfo) {
        flight.disembarkingInstructions += ` ${flight.arrivalAirport.additionalInfo}`;
      }
      
      // Ensure Google Maps links are properly formatted
      if (flight.departureAirport && (!flight.departureAirport.googleMapsUrl || !flight.departureAirport.googleMapsUrl.includes('maps.google.com'))) {
        if (flight.departureAirport.lat && flight.departureAirport.lng) {
          flight.departureAirport.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${flight.departureAirport.lat},${flight.departureAirport.lng}`;
        } else {
          const location = encodeURIComponent(`${flight.departureAirport.name}, ${flight.departureAirport.city}`);
          flight.departureAirport.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location}`;
        }
      }
      
      if (flight.arrivalAirport && (!flight.arrivalAirport.googleMapsUrl || !flight.arrivalAirport.googleMapsUrl.includes('maps.google.com'))) {
        if (flight.arrivalAirport.lat && flight.arrivalAirport.lng) {
          flight.arrivalAirport.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${flight.arrivalAirport.lat},${flight.arrivalAirport.lng}`;
        } else {
          const location = encodeURIComponent(`${flight.arrivalAirport.name}, ${flight.arrivalAirport.city}`);
          flight.arrivalAirport.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location}`;
        }
      }
    });
  }

  gotoQuotation(event: any) {
    this.router.navigate(['/cotacoes'], { queryParams: event });
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
  
  openGoogleMaps(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}