import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanDeactivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(private atuh: AuthService, private router: Router, private route: ActivatedRoute) {}

  canActivate(): boolean {
    if (!this.atuh.isAuthenticated()) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
