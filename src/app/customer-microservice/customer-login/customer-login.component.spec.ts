import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerauthService } from 'src/app/services/customerauth.service';

import { CustomerLoginComponent } from './customer-login.component';

describe('CustomerLoginComponent', () => {
  let component: CustomerLoginComponent;
  let authService:CustomerauthService;
  let http:HttpClient;
  let router:Router;
  beforeEach(()=>{
    authService=new CustomerauthService(http,router);
    component=new CustomerLoginComponent(authService);
  })
  fit('login',()=>{
    spyOn(authService,'authenticate');
    component.login();
    expect(authService.authenticate).toHaveBeenCalled();
  })
});
