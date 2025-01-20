import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthServiceService} from "../services/auth-service.service";

export const juryGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthServiceService);

  const userRole = authService.getUserRole();

  if (userRole === 'ROLE_JURY') {
    return true;
  } else {
    router.navigate(['/forbidden']);
    return false;
  }
};
