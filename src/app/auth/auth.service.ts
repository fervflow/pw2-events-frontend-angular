import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BrowserStorageService } from './storage.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000';
  private isAuthenticatedSignal = signal<boolean>(false);
  isAuthenticated$ = toObservable(this.isAuthenticatedSignal);
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: BrowserStorageService
  ) {
    this.isAuthenticatedSignal.set(!!this.storage.getItem('accessToken'));
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }

  login(email: string, password: string) {
    return this.http.post<{accessToken: string}>(this.API_URL+'/login', { email, password })
      .pipe(
        tap(response => {
          this.storage.setItem('accessToken', response.accessToken);
          this.isAuthenticatedSignal.set(true);
          console.log('LOGIN accessToken: ', this.storage.getItem('accessToken'));
        })
      );
  }

  logout() {
    this.storage.removeItem('accessToken');
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/login']);
  }
}
