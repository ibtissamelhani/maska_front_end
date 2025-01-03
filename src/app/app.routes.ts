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
import {UserResolverService} from "./core/resolvers/user/user-resolver.service";
import {EditUserComponent} from "./components/forms/edit-user/edit-user.component";
import {UsersTableComponent} from "./components/tables/users-table/users-table.component";

export const routes: Routes = [
    {'path': '', component: HomeComponent},
    {'path': 'forbidden', component: ForbiddenComponent },
    {'path': 'auth', component: AuthComponent,
        children: [
            {
                'path': "register",
                component: RegisterComponent,
            },
            {
                'path': "login",
                component: LoginComponent,
            }
        ]
    },
    {'path' : 'admin', component: AdminComponent,
        children:[
          {
            'path': 'dashboard',
            component: DashboardComponent
          },
          {
            'path': 'users', component: UserComponent,
            children: [
              {
                path: '',
                component: UsersTableComponent,
                resolve:{ users: UserResolverService }
              },
              {'path': 'editUser', component: EditUserComponent}
            ]
          },
        ],
      canActivate: [authGuard,adminGuard]
    },
    {'path': '**', component: NotFoundComponent },
];
