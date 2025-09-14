import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) {}

  findOrders(
    page = 1,
    limit = 10,
    flightStatus = 'Todos',
    type: string
  ): Observable<any> {
    return this.http.get(`${environment.api}/v1/user/client/order`, {
      params: {
        page,
        limit,
        flightStatus,
        type,
      },
    });
  }

  findAllSolicitations(page = 1, limit = 10, status: string): Observable<any> {
    return this.http.get(`${environment.api}/v1/user/client/solicitation`, {
      params: {
        page,
        limit,
        status,
      },
    });
  }

  findSolicitation(solicitationId: number): Observable<any> {
    return this.http.get(
      `${environment.api}/v1/user/client/solicitation/${solicitationId}`
    );
  }

  findOrder(orderId: string): Observable<any> {
    return this.http.get(`${environment.api}/v1/user/client/order/${orderId}`);
  }

  selfUser(): Observable<any> {
    return this.http.get(`${environment.api}/v1/user/user/selfie`);
  }

  createLuggage(luggage: any) {
    return this.http.post(`${environment.api}/v1/user/user/selfie`, luggage);
  }

  createPersonReserve(order: any): Observable<any> {
    return this.http.post(`${environment.api}/v1/user/client/order`, order);
  }

  createPersonReserveExclusive(body: any): Observable<any> {
    return this.http.post(
      `${environment.api}/v1/user/client/solicitation`,
      body
    );
  }

  updateUserProfile(userData: any): Observable<any> {
    return this.http.patch<any>(
      `${environment.api}/v1/user/user/selfie`,
      userData
    );
  }
}
