import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'app/header/header.component';


@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export default class FlightsComponent {}
