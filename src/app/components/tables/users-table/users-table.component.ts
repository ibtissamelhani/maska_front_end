import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {User} from "../../../core/interfaces/user";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {Page} from "../../../core/interfaces/page";

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    NgForOf,
    RouterLink
  ],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent  implements OnInit{


  users: User[] = [];
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  pageSize = 10;

  constructor(private route : ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    // Load resolved data for the first page
    const resolvedData: Page<User> = this.route.snapshot.data['users'];
    this.updatePageData(resolvedData);
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
}
