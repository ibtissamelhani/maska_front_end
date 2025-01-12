import { ResolveFn } from '@angular/router';
import {Page} from "../interfaces/page";
import {Competition} from "../interfaces/competition";
import {CompetitionService} from "../services/competition.service";
import {inject} from "@angular/core";
import {catchError, of} from "rxjs";

export const competitionResolver: ResolveFn<Page<Competition>> = (route, state) => {
  const competitionService = inject(CompetitionService);
  return competitionService.getPaginatedCompetitions(0, 12).pipe(
    catchError(error => {
      console.error('Resolver error:', error);
      return of({
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 12
      } as Page<Competition>);
    })
  );
};
