import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Species} from "../../../core/interfaces/species";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpeciesService} from "../../../core/services/species.service";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-update-species-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: 'update-species.component.html',
  styles: ``
})
export class UpdateSpeciesComponent implements OnInit {
  @Input() specie!: Species;
  speciesForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private speciesService: SpeciesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.speciesForm = this.fb.group({
      name: ['', Validators.required],
      minimumWeight: [null],
      points: [null, [Validators.min(0)]],
      category: ['', Validators.required],
      difficulty: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const speciesId = this.route.snapshot.paramMap.get('id');
    if (speciesId) {
      this.speciesService.getSpeciesById(speciesId).subscribe({
        next: (data: Species) => {
          this.specie = data;
          this.speciesForm.patchValue({
            name: this.specie.name,
            minimumWeight: this.specie.minimumWeight,
            points: this.specie.points,
            category: this.specie.category,
            difficulty: this.specie.difficulty
          });
        },
        error: (err) => console.error('Error fetching species-test:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.speciesForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.speciesService.updateSpecies(this.specie.id, this.speciesForm.value)
      .subscribe({
        next: (updatedSpecies) => {
          this.isSubmitting = false;
          console.log("updating species-test done")
          this.router.navigate(['/admin/species'])
        },
        error: (error) => {
          console.error('Error updating species-test:', error);
          this.isSubmitting = false;
        }
      });
  }
}
