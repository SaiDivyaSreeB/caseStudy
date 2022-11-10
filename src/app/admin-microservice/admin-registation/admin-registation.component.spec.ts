import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AdminauthService } from 'src/app/services/adminauth.service';
import {of,throwError} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminRegistationComponent } from './admin-registation.component';

describe('AdminRegistationComponent', () => {
  let component: AdminRegistationComponent;
  let authService:AdminauthService;
  let router : jasmine.SpyObj<Router>;
  let http:HttpClient;
  const user={
    id:"a",
    email:"abcd@gmail.com",
    password:"abcd123",
    token:"",
    fullname:"abcd",
    enabled:"true",
    roles:[{id:"",role:"ADMIN"}]
   }
  beforeEach(()=>{
    router=jasmine.createSpyObj('Router',['navigate']);
    authService=new AdminauthService(http,router);
    component=new AdminRegistationComponent(authService,router);
  })
  fit('should return user alreay exists.. message when registerNow is called',()=>{
    spyOn(authService,'register').and.returnValue(of("User exists already, try with a different email address"));
    component.registerNow();
    expect(router.navigate).toHaveBeenCalledOnceWith(['/admin/register']);
    expect(component.message).toBe("User exists already, try with a different email address");
  })
  fit('should return registered user when registerNow is called',()=>{
    spyOn(authService,'register').and.returnValue(of(user));
    component.registerNow();
    expect(router.navigate).toHaveBeenCalledOnceWith(['/admin/register']);
    expect(component.message).toBe(user);
  })
  fit('should return server error when registerNow is called',()=>{
    spyOn(authService,'register').and.returnValue(throwError(()=> new HttpErrorResponse({status:500,statusText:'server error'})));
    component.registerNow();
    expect(router.navigate).toHaveBeenCalledOnceWith(['/admin/register']);
  })
  fit('ngOninit, getRole function should be called',()=>{
    spyOn(authService,'getRole').and.returnValue("ADMIN");
    component.ngOnInit();
    expect(authService.getRole).toHaveBeenCalledTimes(1);
    expect(component.role).toBe("ADMIN");
  })
 });
