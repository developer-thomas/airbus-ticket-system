import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-luggage-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './luggage-details.component.html',
  styleUrls: ['./luggage-details.component.scss'],
})
export default class LuggageDetailsComponent implements OnInit {
  @Input() id: any;
  order: any;

  constructor(private service: UserAuthService) {}

  ngOnInit(): void {
    this.findOrder();
  }

  findOrder() {
    this.service.findOrder(this.id).subscribe({
      next: (result) => {
        this.order = result;
      },
    });
  }
  openGoogleMaps(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
