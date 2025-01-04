import { Injectable } from '@angular/core';
import {API_BASE_URL} from "../constants/constants";
import {HttpClient} from "@angular/common/http";
import {Participation, ParticipationRequest} from "../interfaces/participation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  private apiUrl = API_BASE_URL;
  constructor(private http: HttpClient) { }

  registerUserToCompetition(competitionId: string): Observable<Participation> {
    return this.http.post<Participation>(`${this.apiUrl}/participation`, {
      competitionId: competitionId
    });
  }
}
