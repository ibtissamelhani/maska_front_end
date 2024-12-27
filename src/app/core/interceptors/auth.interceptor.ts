import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Token } from '@angular/compiler';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>, 
  next:HttpHandlerFn
) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
  return next(req);
};
