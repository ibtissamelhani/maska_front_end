import { Injectable } from '@angular/core';
import {Page} from "../../interfaces/page";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {Resolve} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<Page<User>>{

  constructor(private userService: UserService) { }

  resolve(): Observable<Page<User>>{
    const defaultPage = 0;
    const defaultSize = 10;
    return this.userService.getPaginatedUsers(defaultPage, defaultSize);
  }
}
