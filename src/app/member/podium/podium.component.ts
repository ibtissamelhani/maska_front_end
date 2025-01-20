import {Component, Input, OnInit} from '@angular/core';
import {PodiumDTO} from "../../core/interfaces/podium-dto";
import {ParticipationService} from "../../core/services/participation.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-podium',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './podium.component.html',
  styles: ``
})
export class PodiumComponent implements OnInit {
  @Input() competitionId!: string;
  podium: PodiumDTO[] = [];

  constructor(private participationService : ParticipationService) {}

  ngOnInit(): void {
    if (this.competitionId) {
      this.participationService.getTopThreeParticipants(this.competitionId).subscribe({
        next: (data) => {
          this.podium = data;
        },
        error: (err) => {
          console.error('Error fetching podium data:', err);
        }
      });
    }
  }
}
