import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export default class FlightDetailsComponent {
  @Input() id: string = '';
  order: any;

  constructor(private service: UserAuthService) { }

  ngOnInit(): void {
    this.findOrder()
  }

  findOrder() {
    this.service.findOrder(this.id).subscribe({
      next: (result) => {
        this.order = result
      }
    })
  }

  openGoogleMaps(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }

}
