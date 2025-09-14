import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

export type City = {
  city: string;
  shortCountry: string;
};

export type NoAuthAirport = {
  id: 19340;
  name: string;
  iata: string
  icao: string
  city: string;
  shortCountry: string;
  country: string;
};

interface ResetPassword {
  code: string;
  password: string;
  confirmPassword: string;
}

export type AirPortsAndCitiesResponse = {
  airports: NoAuthAirport[];
  cities: City[];
};

@Injectable({
  providedIn: 'root',
})
export class NoAuthService {
  constructor(private http: HttpClient) {}

  findAirportsAndCities(): Observable<AirPortsAndCitiesResponse> {
    return this.http.get<AirPortsAndCitiesResponse>(
      `${environment.api}/v1/noAuth/airport/cities`
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${environment.api}/v1/noAuth/password/forgot`, { email });
  }

  resetPassword(data: ResetPassword): Observable<any> {
    return this.http.post<any>(`${environment.api}/v1/noAuth/password/reset`, data )
  }

}
