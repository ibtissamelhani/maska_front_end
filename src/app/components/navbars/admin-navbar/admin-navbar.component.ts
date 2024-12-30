import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../../../core/services/auth-service.service";

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [],
  templateUrl: './admin-navbar.component.html',
})
export class AdminNavbarComponent {
  constructor(private router: Router, private authService: AuthServiceService) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
