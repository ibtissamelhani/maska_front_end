import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './shared/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import {AdminComponent} from "./shared/admin/admin.component";
import {DashboardComponent} from "./pages/admin/dashboard/dashboard.component";
import {authGuard} from "./core/guards/auth.guard";
import {adminGuard} from "./core/guards/admin.guard";
import {ForbiddenComponent} from "./pages/error/forbidden/forbidden.component";
import {NotFoundComponent} from "./pages/error/not-found/not-found.component";
import {UserComponent} from "./pages/admin/user/user.component";
import {UserResolverService} from "./core/resolvers/user-resolver.service";
import {EditUserComponent} from "./components/forms/edit-user/edit-user.component";
import {UsersTableComponent} from "./components/tables/users-table/users-table.component";
import {LandingComponent} from "./pages/user/landing/landing.component";
import {competitionResolver} from "./core/resolvers/competition.resolver";
import {CompetitionDetailsComponent} from "./pages/user/competition-details/competition-details.component";
import {CompetitionComponent} from "./pages/admin/competition/competition.component";
import {CompetitionTableComponent} from "./components/tables/competition-table/competition-table.component";
import {publicPagesGuard} from "./core/guards/public-pages.guard";
import {EditCompetitionComponent} from "./components/forms/edit-competition/edit-competition.component";

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [publicPagesGuard]},
    { path: 'forbidden', component: ForbiddenComponent },
    { path: 'auth', component: AuthComponent,
        children: [
            {
                path: "register",
                component: RegisterComponent,
            },
            {
                path: "login",
                component: LoginComponent,
            }
        ],
      canActivate: [publicPagesGuard]
    },
    {   path : 'admin', component: AdminComponent,
        children:[
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'users', component: UserComponent,
            children: [
              {
                path: '',
                component: UsersTableComponent,
                resolve:{ users: UserResolverService }
              },
              { path: 'editUser', component: EditUserComponent}
            ]
          },
          {
            path: "competition", component: CompetitionComponent,
            children: [
              {
                path: '',
                component: CompetitionTableComponent,
                resolve: {competitions: competitionResolver}
              },
              {
                path: "edit",
                component: EditCompetitionComponent
              }
            ]
          },
        ],
      canActivate: [authGuard,adminGuard]
    },
    {
      path: "landing" ,
      component:LandingComponent,
      resolve: {
        competitions: competitionResolver
      },
      canActivate: [authGuard]
    },
    {
      path: "details/:id",
      component: CompetitionDetailsComponent,
      canActivate: [authGuard]
    },
    { path: '**', component: NotFoundComponent },
];
