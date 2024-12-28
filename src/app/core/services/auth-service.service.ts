import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/constants';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest,  } from '../interfaces/auth';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {

  private apiUrl = API_BASE_URL;
  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/authenticate`, credentials)
    .pipe(
      map((response: AuthResponse)=> {

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



  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData).pipe(
      map((response: AuthResponse)=> {

      if (response && response.token) {
        localStorage.setItem('token', response.token); // Store token in localStorage
      } else {
        throw new Error('Authentication failed: Token is missing in the response.');
      }
      return response; // Return the complete response
    }),
    catchError((error: any) => {
      console.error('register error:', error); // Log the error
      return throwError(() => new Error('register failed. Please try again.')); // Return a user-friendly error

      })
    );
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role || null;
    }
    return null;
  }
}
