import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";
import * as UsersActions from  "./users.actions"
import {UserService} from "../../core/services/user.service";


@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(({ page, pageSize }) =>
        this.userService.getPaginatedUsers(page, pageSize).pipe(
          map(data => UsersActions.loadUsersSuccess({ data })),
          catchError(
            error => of(UsersActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  searchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.searchUsers),
      mergeMap(({ criteria }) =>
        this.userService.searchUsers(criteria).pipe(
          map(users => UsersActions.searchUsersSuccess({ users })),
          catchError(error => of(UsersActions.searchUsersFailure({ error: error.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap(({ userId }) =>
        this.userService.deleteUser(userId).pipe(
          map(() => UsersActions.deleteUserSuccess({ userId })),
          catchError(error => of(UsersActions.deleteUserFailure({ error: error.message })))
        )
      )
    )
  );

}
