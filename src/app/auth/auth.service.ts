import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { TokenService } from './token.service';

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
    // private storage: BrowserStorageService
    private tokenService: TokenService,
  ) {
    this.isAuthenticatedSignal.set(!!tokenService.getToken());
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }

  login(email: string, password: string) {
    return this.http.post<{access_token: string}>(this.API_URL+'/login', { email, password })
      .pipe(
        tap(response => {
          this.tokenService.setToken(response.access_token);
          this.isAuthenticatedSignal.set(true);
          console.log('LOGIN accessToken: ', this.tokenService.getToken());
        })
      );
  }

  logout() {
    this.tokenService.removeToken();
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.tokenService.getToken();
  }
}
