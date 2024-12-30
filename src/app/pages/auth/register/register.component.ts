import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { RegisterRequest } from '../../../core/interfaces/auth';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthServiceService,private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
        ]
      ],
      cin: ['', [Validators.required, Validators.pattern('\\d{8}')]],
      nationality: ['', Validators.required],
      role: ['MEMBER'],
    });
}

onSubmit() {
  if (this.registerForm.invalid) {
    this.errorMessage = 'Please fill out the form correctly.';
    return;
  }

  const registerData: RegisterRequest = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = null;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.successMessage = null;
        this.errorMessage = error.message;
      },
    });
}


}
