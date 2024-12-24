import { Component } from '@angular/core';
import { AuthNavbarComponent } from "../../components/navbars/auth-navbar/auth-navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet,AuthNavbarComponent],
  templateUrl: './auth.component.html',
  styles: ``
})
export class AuthComponent {

}
