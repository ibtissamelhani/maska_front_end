import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Competition} from "../../../core/interfaces/competition";
import {CompetitionService} from "../../../core/services/competition.service";
import {Page} from "../../../core/interfaces/page";

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    RouterLink,
  ],
  templateUrl: './competition.component.html',
})
export class CompetitionComponent implements OnInit {
  competitions: Competition[] = [];
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  pageSize = 12;
  isLoading = true;

  constructor(private competitionService: CompetitionService,private route: ActivatedRoute ) {
  }
  ngOnInit() {
    console.log('Component initializing');
    this.fetchCompetition()
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
    this.competitionService.getPaginatedCompetitions(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.updatePageData(data);
        this.isLoading = false;
      },
        error: (err) => {
        console.error('Error loading competitions:', err);
        this.isLoading = false;
      },
    });
  }

  deleteCompetition(competitionId: string): void {
    if (confirm('Are you sure you want to delete this competitions?')) {
      this.competitionService.deleteCompetition(competitionId).subscribe({
        next: () => {
          alert('Competition deleted successfully');
          this.fetchCompetition();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete competitions');
        },
      });
    }
  }
}
