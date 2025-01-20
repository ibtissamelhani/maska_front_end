import {createAction, props} from "@ngrx/store";
import {Page} from "../../core/interfaces/page";
import {User} from "../../core/interfaces/user";


export const loadUsers = createAction(
  '[Users] Load Users',
  props<{ page: number; pageSize: number }>()
);

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ data: Page<User> }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);
