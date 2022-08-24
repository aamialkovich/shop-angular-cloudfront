import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    localStorage.setItem(
      'authorization_token',
      btoa('aamialkovich:TEST_PASSWORD')
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authorization_token');
  }
}
