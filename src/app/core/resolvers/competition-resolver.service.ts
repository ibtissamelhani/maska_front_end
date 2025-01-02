import { Injectable } from '@angular/core';
import {Resolve} from "@angular/router";
import {Page} from "../interfaces/page";
import {Competition} from "../interfaces/competition";
import {CompetitionService} from "../services/competition.service";
import {Observable} from "rxjs";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class CompetitionResolverService implements Resolve<Page<Competition>> {

  constructor(private competitionService: CompetitionService) { }
  resolve(): Observable<Page<Competition>>{
    const defaultPage = 0;
    const defaultSize = 12;
    return this.competitionService.getPaginatedCompetitions(defaultPage, defaultSize);
  }
}
