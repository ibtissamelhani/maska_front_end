import {User} from "../../core/interfaces/user";

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
