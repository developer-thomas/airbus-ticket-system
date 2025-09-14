import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'app/header/header.component';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {

}
