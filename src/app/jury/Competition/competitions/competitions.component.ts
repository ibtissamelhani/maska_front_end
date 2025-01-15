import {Component, OnInit} from '@angular/core';
import {Competition} from "../../../core/interfaces/competition";
import {CompetitionService} from "../../../core/services/competition.service";
import {ActivatedRoute} from "@angular/router";
import {Page} from "../../../core/interfaces/page";
import {CommonModule, DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    CommonModule
  ],
  templateUrl: './competitions.component.html',
  styles: ``
})
export class CompetitionsComponent implements OnInit{

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
    this.fetchCompetition();
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
      this.isLoading = false;
    });
  }

  getSpeciesImage(speciesType: string): string {
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
}
