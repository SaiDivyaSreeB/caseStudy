import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { customerDetails } from '../customer-microservice/customer-registration/customerRegistrationInfo';
import { CustomerauthService } from './customerauth.service';

@Injectable({
  providedIn: 'root'
})

export class CustomerauthGuardService implements CanActivate{
  constructor(private router:Router, private authService:CustomerauthService) { }
  canActivate(): boolean {
    if(this.authService.isLoggedIn())
    {
      console.log("---verifieddd---");
    return true;
    }
    this.router.navigate(['/customer/login'])
    return false;
      }
}
