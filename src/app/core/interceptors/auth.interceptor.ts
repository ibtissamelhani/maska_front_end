import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>, 
  next: HttpHandlerFn
) => {
  // Inject Router at the top level
  const router = inject(Router);
  
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  // Clone the request and add basic headers
  let modifiedReq = req.clone({
    headers: req.headers
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
  });

  // For login and register endpoints, don't add Authorization header
  const isAuthRoute = req.url.includes('/auth/login') || req.url.includes('/auth/register');
  
  if (token && !isAuthRoute) {
    modifiedReq = modifiedReq.clone({
      headers: modifiedReq.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  // Log request for debugging
  console.log('Making request to:', req.url);
  console.log('Request headers:', modifiedReq.headers);
  console.log('Request body:', req.body); 

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {      
      console.error('Request error:', error);

      if (error.status === 403) {
        console.error('Access denied. Please check credentials.');
      }

      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['auth/login']);
      }

      return throwError(() => error);
    })
  );
};