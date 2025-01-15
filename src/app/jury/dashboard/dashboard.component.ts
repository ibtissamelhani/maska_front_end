import { Component } from '@angular/core';
import {AdminNavbarComponent} from "../../shared/navbars/admin-navbar/admin-navbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

}
