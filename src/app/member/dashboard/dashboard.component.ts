import {Component, OnInit} from '@angular/core';
import {IndexNavbarComponent} from "../../shared/navbars/index-navbar/index-navbar.component";
import {User} from "../../core/interfaces/user";
import {UserService} from "../../core/services/user.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    IndexNavbarComponent,
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit {
  userProfile: User | null = null;
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (user: User) => {
        this.userProfile = user;
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        this.errorMessage = 'Failed to load user profile. Please try again later.';
      },
    });
  }
}
