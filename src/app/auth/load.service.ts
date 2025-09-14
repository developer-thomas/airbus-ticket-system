import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env';
import { Observable } from 'rxjs';

export interface Load {
  flight: any;
  luggages: any;
  id?: string;
  name: string;
  description: string;
  amountLuggage: number;
  size: string;
  image: string;
  imageKey: string;
  packageWeight: number;
  totalWeight: number;
  contentType: string;
  additionalNotes?: string;
  flightId: string;
  type: string;
  estimatedTransportTime: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  constructor(private http: HttpClient) {}

  getAllLoads(page: number, limit: number, status: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('flightStatus', status);
    return this.http.get<any>(`${environment.api}/v1/user/company/order`, {
      params,
    });
  }
  getLoad(id: number): Observable<Load> {
    return this.http.get<Load>(
      `${environment.api}/v1/user/company/order/${id}`
    );
  }

  createLoad(order: any): Observable<any> {
    return this.http.post(`${environment.api}/v1/user/client/order`, order);
  }

  updateLoad(id: number, order: any): Observable<any> {
    return this.http.put(
      `${environment.api}/v1/user/company/order/${id}`,
      order
    );
  }

  findAllFlights({ page, limit, status, type }: any): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('status', status)
      .set('type', type);

    return this.http.get<any>(`${environment.api}/v1/noAuth/flight`, {
      params,
    });
  }
}

