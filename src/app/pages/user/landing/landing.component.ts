import {Component, OnInit} from '@angular/core';
import {IndexNavbarComponent} from "../../../components/navbars/index-navbar/index-navbar.component";
import {CommonModule, NgForOf} from "@angular/common";
import {Competition} from "../../../core/interfaces/competition";
import {CompetitionService} from "../../../core/services/competition.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Page} from "../../../core/interfaces/page";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    IndexNavbarComponent,
    CommonModule,
    NgForOf,
    RouterLink,
  ],
  templateUrl: './landing.component.html',
  styles: ``
})
export class LandingComponent implements OnInit{

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

  // Fetch users dynamically for the current page
  private fetchCompetition(): void {
    this.competitionService.getPaginatedCompetitions(this.currentPage, this.pageSize).subscribe((data: Page<Competition>) => {
      this.updatePageData(data);
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
