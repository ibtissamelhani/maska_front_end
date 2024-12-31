import { Injectable } from '@angular/core';
import {API_BASE_URL} from "../constants/constants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/user";
import {Page} from "../interfaces/page";
import {SearchUser} from "../interfaces/search-user";

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

}
