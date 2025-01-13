import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpeciesService} from "../../../core/services/species.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Species} from "../../../core/interfaces/species";

@Component({
  selector: 'app-create-species',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './create-species.component.html',
})
export class CreateSpeciesComponent {

  speciesForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  @Output() speciesCreated = new EventEmitter<Species>();
  @Output() closeModal = new EventEmitter<void>();


  constructor(
    private specieService: SpeciesService,
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

  onSubmit(): void {
    if (this.speciesForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const speciesData = this.speciesForm.value;

    this.specieService.createSpecies(speciesData).subscribe({
      next: (createdSpecies) => {
        this.speciesCreated.emit(createdSpecies); // Emit the created species
        this.closeModal.emit(); // Close the modal
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating species:', error);
        this.error = 'Failed to create species. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
  resetForm(): void {
    this.speciesForm.reset();
    this.isSubmitting = false;
    this.error = null;
  }

}
