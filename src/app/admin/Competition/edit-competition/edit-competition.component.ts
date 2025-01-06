import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Competition} from "../../../core/interfaces/competition";
import {CompetitionService} from "../../../core/services/competition.service";
import {ParticipationService} from "../../../core/services/participation.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-edit-competitions',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './edit-competition.component.html',
})
export class EditCompetitionComponent implements OnInit{
  competitionForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private competitionService: CompetitionService
  ) {
    this.competitionForm = this.fb.group({
      location: ['', Validators.required],
      date: ['', Validators.required],
      minParticipants: [0, [Validators.required, Validators.min(0)]],
      maxParticipants: [0, [Validators.required, Validators.min(0)]],
      speciesType: ['', Validators.required],
      isOpen: [true, Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.competitionService.getCompetitionDetails(id).subscribe(competition => {
      this.competitionForm.patchValue({
        location: competition.location,
        date: this.formatDateForInput(competition.date),
        minParticipants: competition.minParticipants,
        maxParticipants: competition.maxParticipants,
        speciesType: competition.speciesType,
        isOpen: competition.openRegistration
      });
    });
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    // Ensure the date is valid
    if (isNaN(date.getTime())) {
      return '';
    }
    return date.toISOString().split('T')[0];
  }


}
