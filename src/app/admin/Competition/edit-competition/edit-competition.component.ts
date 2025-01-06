import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Competition} from "../../../core/interfaces/competition";
import {CompetitionService} from "../../../core/services/competition.service";
import {ParticipationService} from "../../../core/services/participation.service";

@Component({
  selector: 'app-edit-competitions',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './edit-competition.component.html',
})
export class EditCompetitionComponent implements OnInit{

  competitionId: string = '';
  competition: Competition | null = null;

  constructor(private route: ActivatedRoute, private competitionService: CompetitionService, private participationService: ParticipationService) {
  }

  ngOnInit() {
    this.competitionId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Competition ID:', this.competitionId); // Debug log
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


}
