import {Component, Input, OnInit} from '@angular/core';
import {IndexNavbarComponent} from "../../../components/navbars/index-navbar/index-navbar.component";
import {Competition} from "../../../core/interfaces/competition";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CompetitionService} from "../../../core/services/competition.service";
import {DatePipe} from "@angular/common";
import {ParticipationService} from "../../../core/services/participation.service";
import {ParticipationRequest} from "../../../core/interfaces/participation";

@Component({
  selector: 'app-competition-details',
  standalone: true,
  imports: [
    IndexNavbarComponent,
    DatePipe,
    RouterLink
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
        console.error('Error fetching competition details:', err);
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
          console.log('Successfully registered to competition');
        },
        error: (error) => {
          console.error('Error registering to competition:', error);
        },
        complete: () => {
          this.isLoading = true;
        }
      });
  }

}
