import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './shared/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import {AdminComponent} from "./shared/admin/admin.component";

export const routes: Routes = [
    {'path': '', component: HomeComponent},
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
  {'path' : 'dashboard', component: AdminComponent}
];
