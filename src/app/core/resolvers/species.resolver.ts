import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {catchError, of} from "rxjs";
import {Page} from "../interfaces/page";
import {SpeciesService} from "../services/species.service";
import {Species} from "../interfaces/species";

export const speciesResolver: ResolveFn<Page<Species>> = (route, state) => {

  const speciesService = inject(SpeciesService);

  return speciesService.getPaginatedSpecies(0, 12).pipe(
    catchError(error => {
      console.error('Resolver error:', error);
      return of({
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 12
      } as Page<Species>);
    })
  );
};
