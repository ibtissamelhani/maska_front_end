import { ResolveFn } from '@angular/router';
import {ParticipationService} from "../services/participation.service";
import {inject} from "@angular/core";
import {Participation} from "../interfaces/participation";
import {catchError, of} from "rxjs";
import {Page} from "../interfaces/page";

export const participationResolver: ResolveFn<Page<Participation>> = (route, state) => {
  const participationService = inject(ParticipationService);
  const competitionId : string | null = route.paramMap.get('competitionId');


  return participationService.getPaginatedParticipationsByCompetition(competitionId, 0, 8).pipe(
    catchError((error) => {
      console.error('Error fetching participations:', error);
      return of({
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 8
      } as Page<Participation>);
    })
  );
};
