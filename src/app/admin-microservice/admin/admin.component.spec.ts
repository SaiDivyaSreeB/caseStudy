import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminService } from 'src/app/services/admin.service';
import { AdminauthService } from 'src/app/services/adminauth.service';
import {of,from} from 'rxjs';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let authService :jasmine.SpyObj<AdminauthService>;
  let service: AdminService;
  let http:HttpClient;
  beforeEach(()=>{
    service= new AdminService(http);
    authService= jasmine.createSpyObj('AdminauthService',['getRole','getAdminName','getAdminEmail','getId','updateName','logout']);
    component=new AdminComponent(authService,service);
  })
  fit('ngOnInit',()=>{
    authService.getRole.and.returnValue('ADMIN');
    authService.getAdminEmail.and.returnValue('abc@gmail.com');
    authService.getAdminName.and.returnValue('abc');
    component.ngOnInit();
    expect(component.role).toBe('ADMIN');
    expect(component.adminEmail).toBe('abc@gmail.com');
    expect(component.adminName).toBe('abc');
  })
  fit('editProfile',()=>{
     const updatedUser={
      id:"a",
      email:"abcd@gmail.com",
      password:"abcd123",
      token:"edww",
      fullname:"abcd",
      enabled:"true",
      roles:[{id:"",role:"ADMIN"}],
      image:"abcgf"
     }
    authService.getId.and.returnValue('a');
     spyOn(service,'updateProfile').and.callFake(()=>{
      return from([updatedUser]);
    })
    component.editProfile();
    expect(authService.updateProfile).toHaveBeenCalled();
})
fit('logout',()=>{
  component.logout();
  expect(authService.logout).toHaveBeenCalled();
})
})
