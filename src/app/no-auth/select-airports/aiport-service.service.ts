import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';

type AirportResponse = {
  airports: Airport[];
  countAirports: number;
};

export type Airport = {
  city: string;
  continent: string;
  country: string;
  createdAt: string;
  elevation: number;
  iata: string;
  icao: string;
  id: number;
  lat: string;
  lng: string;
  name: string;
  score: number;
  shortCountry: string;
  status: string;
  updatedAt: string;
};

@Injectable({
  providedIn: 'root',
})
export class AiportServiceService {
  constructor(private http: HttpClient) {}

  findAirports(matchValue: string): Observable<AirportResponse> {
    let property: 'city' | 'iata' = 'iata';
    const value = matchValue.split('-')[0].toUpperCase();

    if (matchValue.length <= 3) {
      property = 'iata';
    } else {
      property = 'city';
    }

    return this.http.get<AirportResponse>(`${environment.api}/v1/noAuth/airport`, {
      params: {
        [property]: value,
        paginate: 'not',
      },
    });
  }

  findAirportById(id: number): Observable<Airport> {
    return this.http.get<Airport>(`${environment.api}/v1/noAuth/airport/${id}`);
  }

  findFlight(
    departureAirportId: string,
    arrivalAirportId: string,
    type = 'Todos',
    nearbyPlaces: any = 'not',
    date = dayjs().add(1, 'day').format('YYYY-MM-DD'),
    hour = dayjs().format('HH:MM')
  ): Observable<any> {
    if (!date) date = dayjs().add(1, 'day').format('YYYY-MM-DD');
    return this.http.get<any>(`${environment.api}/v1/noAuth/flight`, {
      params: {
        type,
        page: 1,
        limit: 10000,
        departureAirportId,
        arrivalAirportId,
        nearbyPlaces,
        departureTime: hour,
        departureDate: date,
      },
    });
  }

  findFlightById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.api}/v1/noAuth/flight/${id}`);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('code', 'ghgbvncv23aklsdmkcmzl239084jdsklmlxzmklm');

    return this.http.post<any>(`${environment.api}/v1/upload/noAuth`, formData);
  }

  sendSolicitation(solicitation: any) {
    return this.http.post(`${environment.api}/v1/noAuth/solicitation`, solicitation);
  }

  registerUser(user: any) {
    return this.http.post<any>(`${environment.api}/v1/noAuth/user/register`, user);
  }
}
