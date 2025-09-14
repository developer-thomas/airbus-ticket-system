import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quotation } from '@core/models/flight.model';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  constructor(private http: HttpClient) { }

  findQuotation(
    departureAirportId: string,
    arrivalAirportId: string,
    departureDate?: string,
    departureTime?: string
  ): Observable<Quotation[]> {
    let params = new HttpParams()
      .set('departureAirportId', departureAirportId)
      .set('arrivalAirportId', arrivalAirportId)

    if (departureDate) params = params.set('departureDate', departureDate);
    if (departureTime) params = params.set('departureTime', departureTime);

    return this.http.get<Quotation[]>(`${environment.api}/v1/noAuth/flight/quotation`, { params });
  }
}
