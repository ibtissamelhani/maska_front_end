import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UpdateUserVM, User} from "../../core/interfaces/user";
import {CommonModule} from "@angular/common";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-updat-profile',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
      CommonModule
    ],
  templateUrl: './updat-profile.component.html',
  styles: ``
})
export class UpdatProfileComponent implements OnInit {

  profileForm: FormGroup;

  nationalities = [
    'American', 'British', 'Canadian', 'French',
    'German', 'Indian', 'Japanese', 'Moroccan', 'Spanish'
  ];
  @Input() user!: User;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.profileForm.setValue({
      username: this.user?.username,
      firstName: this.user?.firstName,
      lastName: this.user?.lastName,
      nationality: this.user?.nationality
    });
  }

  onSubmit() {
    if (this.profileForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const updateData: UpdateUserVM = {
        username: this.profileForm.value.username,
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        nationality: this.profileForm.value.nationality
      };

      this.userService.updateUser(updateData).subscribe({
        next: (response: User) => {
          console.log('User updated successfully:', response);
          this.isSubmitting = false;
          window.location.reload();
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.isSubmitting = false;
        }
      });
    }
  }
}
