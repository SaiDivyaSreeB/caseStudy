import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminauthService } from './adminauth.service';

@Injectable()
export class AdminauthGuardService implements CanActivate{

  constructor(private adminAuth: AdminauthService, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if(this.adminAuth.isLoggedIn()){
      return true;
    }
    else{
      this.router.navigate(['/admin/login']);
      return false;
    }
  }
}
