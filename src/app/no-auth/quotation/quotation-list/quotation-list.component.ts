import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Quotation } from '@core/models/flight.model';
import { FlightService } from '@core/services/flight.service';
import { AiportServiceService, Airport } from 'app/no-auth/select-airports/aiport-service.service';
import { SelectAirportsComponent } from 'app/no-auth/select-airports/select-airports.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuotationCardComponent } from '../quotation-card/quotation-card.component';

type QuotationParams = {
  departureId: string;
  arrivalId: string;
  date?: string;
  hour?: string;
}

@Component({
  selector: 'app-quotation-list',
  standalone: true,
  imports: [
    CommonModule,
    SelectAirportsComponent,
    QuotationCardComponent,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    RouterModule,
  ],
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss']
})
export default class QuotationListComponent implements OnInit {
  private flightService = inject(FlightService);
  private airportService = inject(AiportServiceService);
  private spinner = inject(NgxSpinnerService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  public quotations: Quotation[] = [];
  public arrivalAirport!: Airport;

  @Input() departureId!: string;
  @Input() arrivalId!: string;
  @Input() date!: string;
  @Input() hour!: string;

  ngOnInit(): void {
    this.getQuotations({
      arrivalId: this.arrivalId,
      departureId: this.departureId,
      date: this.date,
      hour: this.hour,
    });
    this.getArrivalAirport();
  }

  public getArrivalAirport(): void {
    this.airportService.findAirportById(+this.arrivalId).subscribe({
      next: (response) => this.arrivalAirport = response,
    });
  }

  public getQuotations(params: QuotationParams): void {
    this.departureId = params.departureId;
    this.arrivalId = params.arrivalId;
    this.date = params.date || '';
    this.hour = params.hour || '';

    this.spinner.show();
    this.getArrivalAirport();
    this.flightService.findQuotation(params.departureId, params.arrivalId, params.date, params.hour).subscribe({
      next: (response) => {
        console.log('quotations', response)
        this.quotations = response;
        this.spinner.hide();
      }
    })
  }

  public goToQuotationDetail(id: number): void {
    sessionStorage.setItem('quotations', JSON.stringify(this.quotations));
    this.router.navigate(['detalhes', id], { relativeTo: this.activatedRoute });
  }
}
