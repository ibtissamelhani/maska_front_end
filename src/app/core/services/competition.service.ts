import { Injectable } from '@angular/core';
import {API_BASE_URL} from "../constants/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../interfaces/page";
import {Competition} from "../interfaces/competition";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private apiUrl = API_BASE_URL;
  constructor(private http: HttpClient) { }

  getPaginatedCompetitions(page: number, size: number): Observable<Page<Competition>> {
    return this.http.get<Page<Competition>>(`${this.apiUrl}/competition/open?page=${page}&size=${size}`)
  }
}
