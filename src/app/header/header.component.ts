import { AsyncPipe, NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '@core/auth/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, NgClass, RouterLink, NgIf, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isBlack = false;
  user$ = this.service.user$


  constructor(private service: UserService){}





}
