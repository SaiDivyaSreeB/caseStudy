import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { WasherauthService } from 'src/app/services/washerauth.service';

import { WasherLoginComponent } from './washer-login.component';

describe('WasherLoginComponent', () => {
  let component: WasherLoginComponent;
  let authService:WasherauthService;
  let http:HttpClient;
  let router:Router;
  beforeEach(()=>{
    authService=new WasherauthService(http,router);
    component=new WasherLoginComponent(authService);
  })
  fit('login',()=>{
    spyOn(authService,'authenticate');
    component.login();
    expect(authService.authenticate).toHaveBeenCalled();
  })
});
