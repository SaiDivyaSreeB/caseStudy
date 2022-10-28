import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';
import { WasherauthService } from './washerauth.service';

@Injectable()
export class WasherauthGuardService implements CanActivate{
constructor(private router:Router, private authService:WasherauthService){}
  canActivate(): boolean {
if(this.authService.isLoggedIn())
{
  console.log("---verifieddd---");
return true;
}
this.router.navigate(['/washer/login'])
return false;
  }
  

}
