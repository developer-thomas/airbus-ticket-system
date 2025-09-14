import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-solicitations-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './solicitations-details.component.html',
  styleUrls: ['./solicitations-details.component.scss'],
})
export default class SolicitationsDetailsComponent implements OnInit {
  @Input() id: string = '';
  solicitation: any;

  constructor(private service: UserAuthService) {}

  ngOnInit(): void {
    this.findSolicitation();
  }

  findSolicitation() {
    this.service.findSolicitation(Number(this.id)).subscribe({
      next: (result) => {
        this.solicitation = result;
        // Ensure Google Maps links are properly formatted
        this.formatLocationLinks();
      },
    });
  }

  formatLocationLinks() {
    if (this.solicitation) {
      // Check if departure airport has location data
      if (this.solicitation.departureAirport && 
          (!this.solicitation.departureAirport.departureLink || 
           !this.solicitation.departureAirport.departureLink.includes('maps.google.com'))) {
        // Create Google Maps link based on airport name and city
        const departureLocation = `${this.solicitation.departureAirport.name}, ${this.solicitation.departureAirport.city}`;
        this.solicitation.departureAirport.departureLink = 
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(departureLocation)}`;
      }
      
      // Check if arrival airport has location data
      if (this.solicitation.arrivalAirport && 
          (!this.solicitation.arrivalAirport.arrivalLink || 
           !this.solicitation.arrivalAirport.arrivalLink.includes('maps.google.com'))) {
        // Create Google Maps link based on airport name and city
        const arrivalLocation = `${this.solicitation.arrivalAirport.name}, ${this.solicitation.arrivalAirport.city}`;
        this.solicitation.arrivalAirport.arrivalLink = 
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(arrivalLocation)}`;
      }
    }
  }

  openPaymentPage(url: string) {
    window.open(url, '_self');
  }
  
  openLocationInNewTab(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}