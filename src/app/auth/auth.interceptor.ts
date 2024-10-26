import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BrowserStorageService } from './storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(BrowserStorageService);
  const token = storage.getItem('accessToken');
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req);
};