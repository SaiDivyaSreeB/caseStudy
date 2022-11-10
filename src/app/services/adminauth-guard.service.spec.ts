import { TestBed } from '@angular/core/testing';
import { Route, Router } from '@angular/router';

import { AdminauthGuardService } from './adminauth-guard.service';
import { AdminauthService } from './adminauth.service';

describe('AdminauthGuardService', () => {
  let service: AdminauthGuardService;
  let authService:jasmine.SpyObj<AdminauthService>;
  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(AdminauthGuardService);
  // });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
  let router:jasmine.SpyObj<Router>
  beforeEach(()=>{
       authService=jasmine.createSpyObj('AdminauthService',['isLoggedIn']);
       router=jasmine.createSpyObj('Router',['navigate']);
      service=new AdminauthGuardService(authService,router);
 
  })
  fit('should return true when canActivate in guard service is called',()=>{
    authService.isLoggedIn.and.returnValue(true);
    expect(service.canActivate()).toEqual(true);
  })
  fit('should return false and navigate to login when canActivate in guard service is called',()=>{
    authService.isLoggedIn.and.returnValue(false);
    expect(service.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledOnceWith(['/adminLogin']);
  })
});
