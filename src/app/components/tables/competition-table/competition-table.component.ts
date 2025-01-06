import {Component, OnInit} from '@angular/core';
import {Competition} from "../../../core/interfaces/competition";
import {CompetitionService} from "../../../core/services/competition.service";
import {ActivatedRoute} from "@angular/router";
import {Page} from "../../../core/interfaces/page";
import {CommonModule, DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-competition-table',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    CommonModule
  ],
  templateUrl: './competition-table.component.html',
})
export class CompetitionTableComponent implements OnInit{

  competitions: Competition[] = [];
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  pageSize = 12;

  constructor(private competitionService: CompetitionService,private route: ActivatedRoute ) {
  }
  ngOnInit() {
    console.log('Component initializing');
    this.route.data.subscribe({
      next: (data) => {
        console.log('Resolver data:', data);
        if (data['competitions']) {
          this.updatePageData(data['competitions']);
        }
      },
      error: (err) => console.error('Resolver error:', err)
    });
  }

  private updatePageData(data: Page<Competition>): void {
    this.competitions = data.content;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.currentPage = data.number;
  }

  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchCompetition();
    }
  }

  onNextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.fetchCompetition();
    }
  }

  private fetchCompetition(): void {
    this.competitionService.getPaginatedCompetitions(this.currentPage, this.pageSize).subscribe((data: Page<Competition>) => {
      this.updatePageData(data);
    });
  }

  deleteCompetition(competitionId: string): void {
    if (confirm('Are you sure you want to delete this competition?')) {
      this.competitionService.deleteCompetition(competitionId).subscribe({
        next: () => {
          alert('Competition deleted successfully');
          this.fetchCompetition();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete competition');
        },
      });
    }
  }

}
