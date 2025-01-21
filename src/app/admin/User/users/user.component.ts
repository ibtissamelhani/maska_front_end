import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CommonModule, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../../core/interfaces/user";
import {UserService} from "../../../core/services/user.service";
import {Page} from "../../../core/interfaces/page";
import {debounceTime, distinctUntilChanged, take} from "rxjs";
import {Store} from "@ngrx/store";
import {
  selectAllUsers,
  selectUsersError,
  selectUsersLoading,
  selectUsersPagination
} from "../../../store/users/users.selectors";
import {loadUsers, searchUsers} from "../../../store/users/users.actions";


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent implements OnInit{

  users$ = this.store.select(selectAllUsers);
  isLoading$ = this.store.select(selectUsersLoading);
  error$ = this.store.select(selectUsersError);
  pagination$ = this.store.select(selectUsersPagination);

  searchForm: FormGroup;

  constructor(private route : ActivatedRoute, private userService: UserService,private fb: FormBuilder, private store: Store)
  {
    this.searchForm = this.fb.group({
      username: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    // Load resolved data for the first page
    this.store.dispatch(loadUsers({ page: 0, pageSize: 10 }));

    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(criteria => {
        this.store.dispatch(searchUsers({ criteria }));
      });
  }



  onPreviousPage(): void {
    this.pagination$.pipe(take(1)).subscribe(pagination => {
      if (pagination.currentPage > 0) {
        this.store.dispatch(loadUsers({
          page: pagination.currentPage - 1,
          pageSize: pagination.pageSize
        }));
      }
    });
  }


  onNextPage(): void {
    this.pagination$.pipe(take(1)).subscribe(pagination => {
      if (pagination.currentPage + 1 < pagination.totalPages) {
        this.store.dispatch(loadUsers({
          page: pagination.currentPage + 1,
          pageSize: pagination.pageSize
        }));
      }
    });
  }

  private fetchUsers(): void {
    this.userService.getPaginatedUsers(1, 10).subscribe({
      next: (data: Page<User>) => {
        // Ce bloc est exécuté lorsque des données sont reçues avec succès.
        //this.updatePageData(data);
        console.log('Données reçues :', data);
      },
        error: (err: any) => {
        // Ce bloc est exécuté si une erreur survient lors de la requête.
        console.error('Erreur lors de la récupération des utilisateurs :', err);
      },
        complete: () => {
        // Ce bloc est exécuté lorsque l'observable a terminé son émission.
        console.log('Récupération des utilisateurs terminée.');
      },
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this users?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          alert('User deleted successfully');
          this.fetchUsers();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete users');
        },
      });
    }
  }


  getInitials(username: string): string {
    return username.split(' ').map(word => word[0].toUpperCase()).slice(0, 2).join('');
  }

}
