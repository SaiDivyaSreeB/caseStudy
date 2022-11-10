import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { WasherauthGuardService } from './washerauth-guard.service';
import { WasherauthService } from './washerauth.service';

describe('WasherauthGuardService', () => {
  let service: WasherauthGuardService;
  let authService:jasmine.SpyObj<WasherauthService>;
  let router:jasmine.SpyObj<Router>
  beforeEach(()=>{
       authService=jasmine.createSpyObj(WasherauthService,['isLoggedIn']);
       router=jasmine.createSpyObj('Router',['navigate']);
      service=new WasherauthGuardService(router,authService);
 
  })
  fit('should return true when canActivate in guard service is called',()=>{
    authService.isLoggedIn.and.returnValue(true);
    expect(service.canActivate()).toEqual(true);
  })
  fit('should return false and navigate to login when canActivate in guard service is called',()=>{
    authService.isLoggedIn.and.returnValue(false);
    expect(service.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledOnceWith(['/washerLogin']);
  })
});
