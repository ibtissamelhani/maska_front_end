import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from "@angular/router";
import {Page} from "../interfaces/page";
import {Competition} from "../interfaces/competition";
import {CompetitionService} from "../services/competition.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompetitionResolverService implements Resolve<Page<Competition>>{

  constructor(private competitionService: CompetitionService) { }

  resolve(): Observable<Page<Competition>> {
    const defaultPage = 0;
    const defaultSize = 10;
    return this.competitionService.getPaginatedCompetitions(defaultPage, defaultSize);
  }
}
