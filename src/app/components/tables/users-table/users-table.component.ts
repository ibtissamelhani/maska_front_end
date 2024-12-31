import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {User} from "../../../core/interfaces/user";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {Page} from "../../../core/interfaces/page";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {SearchUser} from "../../../core/interfaces/search-user";

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    NgForOf,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent  implements OnInit{

  isLoading = false;
  searchForm: FormGroup;
  users: User[] = [];
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  pageSize = 10;

  constructor(private route : ActivatedRoute, private userService: UserService,private fb: FormBuilder)
  {
    this.searchForm = this.fb.group({
      username: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    // Load resolved data for the first page
    const resolvedData: Page<User> = this.route.snapshot.data['users'];
    this.updatePageData(resolvedData);

    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(values => {
        this.searchUsers(values);
      });
  }

  private updatePageData(data: Page<User>): void {
    this.users = data.content;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
  }


  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchUsers();
    }
  }


  onNextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.fetchUsers();
    }
  }

  // Fetch users dynamically for the current page
  private fetchUsers(): void {
    this.userService.getPaginatedUsers(this.currentPage, this.pageSize).subscribe((data: Page<User>) => {
      this.updatePageData(data);
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          alert('User deleted successfully');
          this.fetchUsers();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete user');
        },
      });
    }
  }

  searchUsers(criteria: SearchUser) {
    this.isLoading = true;
    this.userService.searchUsers(criteria)
      .subscribe({
        next: (results) => {
          this.users = results;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.isLoading = false;
        }
      });
  }
}
