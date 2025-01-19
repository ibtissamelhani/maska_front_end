import { Injectable } from '@angular/core';
import {API_BASE_URL} from "../constants/constants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UpdateUserVM, User} from "../interfaces/user";
import {Page} from "../interfaces/page";
import {SearchUser} from "../interfaces/search-user";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = API_BASE_URL;
  constructor(private http: HttpClient) { }

  getPaginatedUsers(page: number, size: number): Observable<Page<User>> {
    return this.http.get<Page<User>>(`${this.apiUrl}/users?page=${page}&size=${size}`);
  }

  deleteUser(userId: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/users/delete/${userId}`);
  }

  searchUsers(searchCriteria: SearchUser): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/users/search`, searchCriteria);
  }

  getUserProfile(): Observable<User> {
    const token = localStorage.getItem('token');
    let userId: string | null = null;

    if (token) {
      const decodedToken: any = jwtDecode(token);
      userId = decodedToken.id;
    }
    console.log(" user id" + userId)
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  updateUser(userData: UpdateUserVM): Observable<User> {
    const token = localStorage.getItem('token');
    let userId: string | null = null;

    if (token) {
      const decodedToken: any = jwtDecode(token);
      userId = decodedToken.id;
    }
    return this.http.put<User>(`${this.apiUrl}/users/${userId}`, userData);
  }

}
