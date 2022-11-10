import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { WasherauthService } from 'src/app/services/washerauth.service';
import { WasherRegistrationComponent } from 'src/app/washer-microservice/washer-registration/washer-registration.component';
import {of,throwError} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerRegistrationComponent } from './customer-registration.component';
import { CustomerauthService } from 'src/app/services/customerauth.service';

describe('CustomerRegistrationComponent', () => {
  let component: CustomerRegistrationComponent;
  let authService:CustomerauthService;
  let router : jasmine.SpyObj<Router>;
  let http:HttpClient;
  const user={
    id:"a",
    email:"abcd@gmail.com",
    password:"abcd123",
    token:"",
    fullname:"abcd",
    enabled:"true",
    roles:[{id:"",role:"USER"}]
   }
  beforeEach(()=>{
    router=jasmine.createSpyObj('Router',['navigate']);
    authService=new CustomerauthService(http,router);
    component=new CustomerRegistrationComponent(authService,router);
  })
  fit('should return user alreay exists.. message when registerNow is called',()=>{
    spyOn(authService,'register').and.returnValue(of("User exists already, try with a different email address"));
    component.registerNow();
    expect(router.navigate).toHaveBeenCalledOnceWith(['/customerLogin']);
    expect(component.message).toBe("User exists already, try with a different email address");
  })
  fit('should return registered user when registerNow is called',()=>{
    spyOn(authService,'register').and.returnValue(of(user));
    component.registerNow();
    expect(router.navigate).toHaveBeenCalledOnceWith(['/customerLogin']);
    expect(component.message).toBe(user);
  })
  fit('should return server error when registerNow is called',()=>{
    spyOn(authService,'register').and.returnValue(throwError(()=> new HttpErrorResponse({status:500,statusText:'server error'})));
    component.registerNow();
    expect(router.navigate).toHaveBeenCalledOnceWith(['/customerRegister']);
  })
});
