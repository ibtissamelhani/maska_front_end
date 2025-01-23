import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideStore} from "@ngrx/store";
import {usersReducer} from "./store/users/users.reducer";
import {provideEffects} from "@ngrx/effects";
import {UsersEffects} from "./store/users/users.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore({ users: usersReducer }),
    provideEffects([UsersEffects]),
    provideHttpClient(withInterceptors([authInterceptor])), provideAnimationsAsync()],

};
