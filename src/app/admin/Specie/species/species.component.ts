import {Component, OnInit} from '@angular/core';
import {SpeciesService} from "../../../core/services/species.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "../../../core/interfaces/page";
import {Species} from "../../../core/interfaces/species";
import {CommonModule, NgClass, NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './species.component.html',
})
export class SpeciesComponent implements OnInit{
  species: Species[] = [];
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  pageSize = 8;

  speciesForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;


  constructor(
    private specieService: SpeciesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.speciesForm = this.fb.group({
      name: ['', Validators.required],
      minimumWeight: ['', [Validators.min(0)]],
      points: ['', [Validators.min(0)]],
      category: ['', Validators.required],
      difficulty: ['', Validators.required]
    });
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

  onSubmit(): void {
    if (this.speciesForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const speciesData = this.speciesForm.value;

    this.specieService.createSpecies(speciesData).subscribe({
      next: (createdSpecies) => {
        this.router.navigate(['/admin/species']);
      },
      error: (error) => {
        console.error('Error creating species:', error);
        this.error = 'Failed to create species. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

}
