import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SigninCredentialsResponse, User } from './auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userSubject = new BehaviorSubject<User | null>(null);
  helper = new JwtHelperService();
  constructor(private storage: StorageService) {
    storage.hasToken() && this.decodeAndNotify(storage.getToken())
  }

  decodeAndNotify(token: string) {
    const decodedToken = this.helper.decodeToken(token)
    this.storage.saveToken(token);
    this._userSubject.next(decodedToken as User);
  }

  get user$() {
    return this._userSubject.asObservable();
  }

  logout(){
    this.storage.removeToken()
    this._userSubject.next(null)
  }
}
