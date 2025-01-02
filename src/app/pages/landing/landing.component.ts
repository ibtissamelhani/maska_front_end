import { Component } from '@angular/core';
import {IndexNavbarComponent} from "../../components/navbars/index-navbar/index-navbar.component";
import {AuthNavbarComponent} from "../../components/navbars/auth-navbar/auth-navbar.component";
import {CompetitionsComponent} from "../../components/tables/competitions/competitions.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    IndexNavbarComponent,
    CompetitionsComponent
  ],
  templateUrl: './landing.component.html',
  styles: ``
})
export class LandingComponent {

}
