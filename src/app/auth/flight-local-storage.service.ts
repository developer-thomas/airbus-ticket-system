import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlightLocalStorageService {
  constructor() {}

  saveFight(flight: any) {
    localStorage.setItem('flight', JSON.stringify(flight));
  }

  getFlight(): any {
    return localStorage.getItem('flight');
  }

  removeFight() {
    localStorage.removeItem('flight');
  }
}
