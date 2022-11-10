import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminauthService } from 'src/app/services/adminauth.service';

import { AdminLoginComponent } from './admin-login.component';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let authService:AdminauthService;
  let http:HttpClient;
  let router:Router;
  beforeEach(()=>{
    authService=new AdminauthService(http,router);
    component=new AdminLoginComponent(authService);
  })
  fit('login',()=>{
    spyOn(authService,'authenticate');
    component.login();
    expect(authService.authenticate).toHaveBeenCalled();
  })
  
});
