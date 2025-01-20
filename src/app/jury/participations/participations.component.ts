import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Page} from "../../core/interfaces/page";
import {Participation} from "../../core/interfaces/participation";
import {ParticipationService} from "../../core/services/participation.service";
import {CommonModule, NgForOf} from "@angular/common";

@Component({
  selector: 'app-participations',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './participations.component.html',
  styles: ``
})
export class ParticipationsComponent implements OnInit{
  participations: Participation[] = [];
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  pageSize = 8;
  competitionId: string | null = null;


  constructor(
    private participationService: ParticipationService,
    private route: ActivatedRoute,
  ) {

  }


  ngOnInit(): void {
    this.competitionId = this.route.snapshot.paramMap.get('competitionId');

    if (!this.competitionId) {
      console.error('Competition ID is missing in route parameters.');
      return;
    }

    const resolvedData: Page<Participation> = this.route.snapshot.data['participations'];
    this.updatePageData(resolvedData);
  }


  private updatePageData(data: Page<Participation>): void {
    this.participations = data.content;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.currentPage = data.number;
  }
  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchParticipations();
    }
  }


  onNextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.fetchParticipations();
    }
  }

  private fetchParticipations(): void {
    if (!this.competitionId) {
      console.error('Cannot fetch participations without a valid competition ID.');
      return;
    }

    this.participationService.getPaginatedParticipationsByCompetition(this.competitionId, this.currentPage, this.pageSize).subscribe({
      next: (data: Page<Participation>) => {
        this.updatePageData(data);
      },
      error: (err: any) => {
        console.error('Error fetching participations:', err);
      }
    });
  }
}
