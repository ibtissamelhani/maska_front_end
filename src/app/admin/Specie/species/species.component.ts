import {Component, OnInit} from '@angular/core';
import {SpeciesService} from "../../../core/services/species.service";
import {ActivatedRoute} from "@angular/router";
import {Page} from "../../../core/interfaces/page";
import {Species} from "../../../core/interfaces/species";

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [],
  templateUrl: './species.component.html',
})
export class SpeciesComponent implements OnInit{
  species: Species[] = [];
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  pageSize = 12;


  constructor(private specieService: SpeciesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const resolvedData: Page<Species> = this.route.snapshot.data["species"];
    this.updatePageData(resolvedData);
  }

  private updatePageData(data: Page<Species>): void {
    this.species = data.content;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.currentPage = data.number;
  }
  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchSpecies();
    }
  }


  onNextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.fetchSpecies();
    }
  }

  private fetchSpecies(): void {
    this.specieService.getPaginatedSpecies(this.currentPage, this.pageSize).subscribe({
      next: (data: Page<Species>) => {
        this.updatePageData(data);
        console.log('Données reçues :', data);
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des species :', err);
      },
      complete: () => {
        console.log('Récupération des species terminée.');
      },
    });
  }

}
