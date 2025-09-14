import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Quotation } from '@core/models/flight.model';

@Component({
  selector: 'app-quotation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotation-card.component.html',
  styleUrls: ['./quotation-card.component.scss']
})
export class QuotationCardComponent {
  @Input({ required: true }) quotation!: Quotation;
}
