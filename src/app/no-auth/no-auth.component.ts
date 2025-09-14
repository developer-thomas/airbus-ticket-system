import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-no-auth',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule],
  template: `
    <router-outlet></router-outlet>
    <ngx-spinner></ngx-spinner>
  `,
})
export class NoAuthComponent {}
