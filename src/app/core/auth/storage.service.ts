import { Injectable } from '@angular/core';
const KEY = 'mobair-cliente';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  getToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  removeToken() {
    return localStorage.removeItem(KEY)
  }

  hasToken() {
    return !!this.getToken();
  }
}
