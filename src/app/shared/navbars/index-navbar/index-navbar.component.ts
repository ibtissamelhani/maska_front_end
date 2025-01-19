import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthServiceService} from "../../../core/services/auth-service.service";

@Component({
  selector: 'app-index-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './index-navbar.component.html',
  styles: ``
})
export class IndexNavbarComponent {
  constructor(private router: Router, private authService: AuthServiceService) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
