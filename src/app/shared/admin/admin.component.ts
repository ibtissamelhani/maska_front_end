import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {AdminNavbarComponent} from "../navbars/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styles: ``
})
export class AdminComponent {

}
