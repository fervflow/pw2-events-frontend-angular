import { HttpContextToken, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if(req.context.get(IS_PUBLIC)){
    return next(req);
  }
  if(authService.isAuthenticated())
  {
    const authHeader = addAuthorizationHeader(req);
    return next(authHeader);
  }
  return next(req);
};

const addAuthorizationHeader = (req: HttpRequest<any>) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
    // headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
};

export const IS_PUBLIC = new HttpContextToken(() => false);