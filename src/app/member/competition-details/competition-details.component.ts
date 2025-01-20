import {Component, Input, OnInit} from '@angular/core';
import {IndexNavbarComponent} from "../../shared/navbars/index-navbar/index-navbar.component";
import {Competition} from "../../core/interfaces/competition";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CompetitionService} from "../../core/services/competition.service";
import {CommonModule, DatePipe} from "@angular/common";
import {ParticipationService} from "../../core/services/participation.service";
import {ParticipationRequest} from "../../core/interfaces/participation";
import {PodiumComponent} from "../podium/podium.component";

@Component({
  selector: 'app-competitions-details',
  standalone: true,
  imports: [
    IndexNavbarComponent,
    DatePipe,
    RouterLink,
    PodiumComponent,
    CommonModule
  ],
  templateUrl: './competition-details.component.html',
  styles: ``
})
export class CompetitionDetailsComponent implements OnInit{

  competitionId: string = '';
  competition: Competition | null = null;
  @Input() compId!: string;
  isLoading = false;

  constructor(private route: ActivatedRoute, private competitionService: CompetitionService, private participationService: ParticipationService) {
  }

  ngOnInit() {
    this.competitionId = this.route.snapshot.paramMap.get('id') || '';
    if (this.competitionId) {
      this.loadCompetitionDetails();
    }
  }

  loadCompetitionDetails(): void {
    this.competitionService.getCompetitionDetails(this.competitionId).subscribe({
      next: (data) => {
        this.competition = data;
      },
      error: (err) => {
        console.error('Error fetching competitions details:', err);
      }
    });
  }

  getSpeciesImage(speciesType: string | undefined): string {
    switch (speciesType) {
      case 'BIG_GAME':
        return 'big.webp';
      case 'SEA':
        return 'sea.webp';
      case 'BIRD':
        return 'bird.webp';
      default:
        return 'f.jpg';
    }
  }

  participate() {
    if (!this.competitionId) return;

    this.isLoading = true;
    this.participationService.registerUserToCompetition(this.competitionId)
      .subscribe({
        next: (response) => {
          console.log('Successfully registered to competitions');
        },
        error: (error) => {
          console.error('Error registering to competitions:', error);
        },
        complete: () => {
          this.isLoading = true;
        }
      });
  }

}
