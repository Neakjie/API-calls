import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    let user = this.auth.currentUser;
    if (user && user.admin)
      return true;

    this.router.navigate(["no-access"]);
    return false;
  }
}
