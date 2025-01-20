import {Component, OnInit} from '@angular/core';
import {ParticipationResultDTO} from "../../core/interfaces/participation";
import {ParticipationService} from "../../core/services/participation.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './competitions.component.html',
  styles: ``
})
export class CompetitionsComponent implements OnInit {
  results: ParticipationResultDTO[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private participationService: ParticipationService) {}

  ngOnInit(): void {
    this.fetchResults();
  }

  fetchResults(): void {
    this.isLoading = true;
    this.participationService.getUserAllCompetitionsResults().subscribe({
      next: (data: ParticipationResultDTO[]) => {
        this.results = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch results.';
        console.error('Error fetching results:', error);
        this.isLoading = false;
      },
    });
  }
}
