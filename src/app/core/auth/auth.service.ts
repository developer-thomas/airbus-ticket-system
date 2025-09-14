import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';

import { Observable, tap } from 'rxjs';

import { SigninCredentialsResponse } from './auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  auth(data: any): Observable<SigninCredentialsResponse> {
    return this.http
      .post<SigninCredentialsResponse>(`${environment.api}/v1/sessions/standard`, data)
      .pipe(tap(user => this.userService.decodeAndNotify(user.token)));
  }
}
