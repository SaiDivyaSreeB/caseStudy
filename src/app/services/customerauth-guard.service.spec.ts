import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CustomerauthGuardService } from './customerauth-guard.service';
import { CustomerauthService } from './customerauth.service';

describe('CustomerauthGuardService', () => { 
  let service: CustomerauthGuardService;
  let authService:jasmine.SpyObj<CustomerauthService>;
  let router:jasmine.SpyObj<Router>
  beforeEach(()=>{
       authService=jasmine.createSpyObj(CustomerauthService,['isLoggedIn']);
       router=jasmine.createSpyObj('Router',['navigate']);
      service=new CustomerauthGuardService(router,authService);
 
  })
  fit('should return true when canActivate in guard service is called',()=>{
    authService.isLoggedIn.and.returnValue(true);
    expect(service.canActivate()).toEqual(true);
  })
  fit('should return false and navigate to login when canActivate in guard service is called',()=>{
    authService.isLoggedIn.and.returnValue(false);
    expect(service.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledOnceWith(['/customerLogin']);
  })
});
