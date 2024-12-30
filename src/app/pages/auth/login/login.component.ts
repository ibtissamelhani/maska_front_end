import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink  , FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private authService: AuthServiceService, private router: Router){}

  onSubmit(): void{

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    const credentials= {
      email: this.email,
      password: this.password
    };

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(credentials).subscribe({
      next: (response) => {
        const userRole = this.authService.getUserRole();
        if (userRole === 'ROLE_ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (userRole === 'ROLE_MEMBER') {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Unknown role. Access denied.';
        }
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'An error occurred during login check your credentials';
      }
    });
  }

}
