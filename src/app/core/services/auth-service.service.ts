import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/constants';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {

  private apiUrl = API_BASE_URL; 
  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
    .pipe(
      map((response: LoginResponse)=> {
        
      if (response && response.token) {
        localStorage.setItem('token', response.token); // Store token in localStorage
      } else {
        throw new Error('Authentication failed: Token is missing in the response.');
      }
      return response; // Return the complete response
    }),
    catchError((error: any) => {
      console.error('Login error:', error); // Log the error
      return throwError(() => new Error('Login failed. Please try again.')); // Return a user-friendly error
   
      })
    );
  }
}
