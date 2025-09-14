import { Component, Input } from '@angular/core';
import { CurrencyPipe, NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [NgOptimizedImage, CurrencyPipe, NgIf],
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent {
  @Input({ required: true }) flight: any;
}
