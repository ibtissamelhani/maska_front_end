import { Injectable } from '@angular/core';
import {API_BASE_URL} from "../constants/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../interfaces/page";
import {Species} from "../interfaces/species";

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  private apiUrl = API_BASE_URL;
  constructor(private http: HttpClient) { }

  getPaginatedSpecies(page: number, size: number): Observable<Page<Species>> {
    return this.http.get<Page<Species>>(`${this.apiUrl}/species?page=${page}&size=${size}`)
  }

  createSpecies(speciesData: Partial<Species>): Observable<Species> {
    return this.http.post<Species>(`${this.apiUrl}/species`, speciesData);
  }

  deleteSpecies(specieId: String): Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/species/delete/${specieId}`);
  }

  updateSpecies(id: string, speciesData: Partial<Species>): Observable<Species> {
    return this.http.put<Species>(`${this.apiUrl}/species/${id}`, speciesData);
  }

  getSpeciesById(id: string): Observable<Species> {
    return this.http.get<Species>(`${this.apiUrl}/species/${id}`);
  }

}
