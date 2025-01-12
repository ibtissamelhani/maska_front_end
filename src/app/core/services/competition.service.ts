import { Injectable } from '@angular/core';
import {API_BASE_URL} from "../constants/constants";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Page} from "../interfaces/page";
import {Competition} from "../interfaces/competition";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private apiUrl = API_BASE_URL;
  constructor(private http: HttpClient) { }

  getPaginatedCompetitions(page: number, size: number): Observable<Page<Competition>> {
    return this.http.get<Page<Competition>>(`${this.apiUrl}/competition?page=${page}&size=${size}`)
  }

  getCompetitionDetails(id: string): Observable<Competition> {
    return this.http.get<Competition>(`${this.apiUrl}/competition/details/${id}`);
  }

  deleteCompetition(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/competition/delete/${id}`);
  }

  updateCompetition(id: string, competition: Competition): Observable<Competition> {
    return this.http.put<Competition>(`${this.apiUrl}/competition/${id}`, competition);
  }

}
