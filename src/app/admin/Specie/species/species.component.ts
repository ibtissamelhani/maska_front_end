import {Component, OnInit} from '@angular/core';
import {SpeciesService} from "../../../core/services/species.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Page} from "../../../core/interfaces/page";
import {Species} from "../../../core/interfaces/species";
import {NgClass, NgForOf} from "@angular/common";
import {CreateSpeciesComponent} from "../create-species/create-species.component";

@Component({
  selector: 'app-species-test',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    CreateSpeciesComponent,
    RouterLink
  ],
  templateUrl: './species.component.html',
})
export class SpeciesComponent implements OnInit{
  species: Species[] = [];
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  pageSize = 8;


  constructor(
    private specieService: SpeciesService,
    private route: ActivatedRoute,
  ) {

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
        console.error('Erreur lors de la récupération des species-test :', err);
      },
      complete: () => {
        console.log('Récupération des species-test terminée.');
      },
    });
  }



  deleteSpecie(specieId: string): void {
    if (confirm('Are you sure you want to delete this specie?')) {
      this.specieService.deleteSpecies(specieId).subscribe({
        next: () => {
          alert('specie deleted successfully');
          this.fetchSpecies();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete specie');
        },
      });
    }
  }

}
