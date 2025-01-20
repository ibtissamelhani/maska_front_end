import { Injectable } from '@angular/core';
import {API_BASE_URL} from "../constants/constants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Participation, ParticipationRequest, ParticipationResultDTO} from "../interfaces/participation";
import {Observable} from "rxjs";
import {Page} from "../interfaces/page";
import {jwtDecode} from "jwt-decode";
import {PodiumDTO} from "../interfaces/podium-dto";

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

  getPaginatedParticipationsByCompetition(competitionId: string | null, page: number, size: number) : Observable<Page<Participation>> {
    return this.http.get<Page<Participation>>(`${this.apiUrl}/participation/competition/${competitionId}?page=${page}&size=${size}`);
  }

  getUserAllCompetitionsResults(): Observable<ParticipationResultDTO[]> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const decodedToken: { id: string } = jwtDecode<{ id: string }>(token);
    const userId = decodedToken.id;

    if (!userId) {
      throw new Error('Invalid token: User ID not found.');
    }

    const params = new HttpParams().set('userId', userId);
    return this.http.get<ParticipationResultDTO[]>(`${this.apiUrl}/participation/results`, { params });
  }

  getTopThreeParticipants(competitionId: string): Observable<PodiumDTO[]> {
    const params = new HttpParams().set('competitionId', competitionId);
    return this.http.get<PodiumDTO[]>(`${this.apiUrl}/participation/podium`, { params });
  }
}
