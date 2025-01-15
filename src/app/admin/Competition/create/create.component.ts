import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CompetitionService} from "../../../core/services/competition.service";

@Component({
  selector: 'app-create',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './create.component.html',
  styles: ``
})
export class CreateComponent {

  competitionForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private competitionService: CompetitionService
  ) {
    this.competitionForm = this.fb.group({
      location: ['', [Validators.required]],
      date: ['', [Validators.required]],
      minParticipants: [null, [Validators.required, Validators.min(0)]],
      maxParticipants: [null, [Validators.required, Validators.min(0)]],
      speciesType: ['', [Validators.required]]
    });
  }


  onSubmit(): void {
    if (this.competitionForm.invalid || this.isSubmitting) {
      return;
    }
      this.isSubmitting = true;

      const competitionData = this.competitionForm.value;
    if (competitionData.date) {
      competitionData.date = new Date(competitionData.date).toISOString().slice(0, 19);
    }
      this.competitionService.createCompetition(competitionData)
        .subscribe({
          next: (response) => {
            console.log('Competition created successfully', response);
            this.competitionForm.reset();
          },
          error: (error) => {
            console.error('Error creating competition', error);
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
  }


}
