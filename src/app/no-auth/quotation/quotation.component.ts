import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'app/header/header.component';

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent {

}
