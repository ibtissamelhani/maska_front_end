import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './shared/auth/auth.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import {AdminComponent} from "./shared/admin/admin.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {authGuard} from "./core/guards/auth.guard";
import {adminGuard} from "./core/guards/admin.guard";
import {ForbiddenComponent} from "./pages/error/forbidden/forbidden.component";
import {NotFoundComponent} from "./pages/error/not-found/not-found.component";
import {UserComponent} from "./admin/User/users/user.component";
import {UserResolverService} from "./core/resolvers/user-resolver.service";
import {EditUserComponent} from "./admin/User/edit-user/edit-user.component";
import {LandingComponent} from "./member/landing/landing.component";
import {competitionResolver} from "./core/resolvers/competition.resolver";
import {CompetitionDetailsComponent} from "./member/competition-details/competition-details.component";
import {CompetitionComponent} from "./admin/Competition/competitions/competition.component";
import {publicPagesGuard} from "./core/guards/public-pages.guard";
import {EditCompetitionComponent} from "./admin/Competition/edit-competition/edit-competition.component";
import {UsersLayoutComponent} from "./admin/User/users-layout/users-layout.component";
import {CompetitionLayoutComponent} from "./admin/Competition/competition-layout/competition-layout.component";
import {CompetitionResolverService} from "./core/resolvers/competition-resolver.service";
import {SpeciesLayoutComponent} from "./admin/Specie/species-layout/species-layout.component";
import {SpeciesComponent} from "./admin/Specie/species/species.component";
import {speciesResolver} from "./core/resolvers/species.resolver";

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
            path: 'users', component: UsersLayoutComponent,
            children: [
              { path: '', component: UserComponent, resolve:{ users: UserResolverService },},
              { path: 'editUser', component: EditUserComponent}
            ],
          },
          {
            path: "competition", component: CompetitionLayoutComponent,
            children: [
              {
                path: '',
                component: CompetitionComponent,
                resolve: {competitions: CompetitionResolverService}
              },
              {
                path: 'edit/:id',
                component: EditCompetitionComponent
              }
            ]
          },
          {
            path: "species", component: SpeciesLayoutComponent,
            children: [
              {
                path: '',
                component: SpeciesComponent,
                resolve: {species: speciesResolver}
              },
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
