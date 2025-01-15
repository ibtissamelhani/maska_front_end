import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../../../core/services/auth-service.service";
import {LogoutButtonComponent} from "../../logout-button/logout-button.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LogoutButtonComponent
  ],
  templateUrl: './admin-navbar.component.html',
})
export class AdminNavbarComponent {

}
