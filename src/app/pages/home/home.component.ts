import { Component } from '@angular/core';
import { IndexNavbarComponent } from "../../components/navbars/index-navbar/index-navbar.component";
import { AuthNavbarComponent } from "../../components/navbars/auth-navbar/auth-navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
