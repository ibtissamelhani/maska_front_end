import {UsersState} from "./users.state";
import {createReducer, on} from "@ngrx/store";
import * as UsersActions from  "./users.actions"

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  totalElements: 0,
  totalPages: 0,
  currentPage: 0,
  pageSize: 10
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.loadUsersSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    users: data.content,
    totalElements: data.totalElements,
    totalPages: data.totalPages,
    currentPage: data.number,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  on(UsersActions.searchUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    totalElements: users.length,
    totalPages: Math.ceil(users.length / state.pageSize),
    currentPage: 0,
    loading: false
  })),
  on(UsersActions.searchUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  on(UsersActions.deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter(user => user.id !== userId)
  })),

)
