import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerauthService } from 'src/app/services/customerauth.service';
import {from} from'rxjs';
import { CustomerComponent } from './customer.component';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let authService :jasmine.SpyObj<CustomerauthService>;
  let service: CustomerService;
  let http:HttpClient;
  beforeEach(()=>{
    service= new CustomerService(http);
    authService= jasmine.createSpyObj('AdminauthService',['getCustomerEmail','getCustomerName','getCustomerId','updateName','logout']);
    component=new CustomerComponent(authService,service);
  })
  fit('ngOnInit',()=>{
   
    authService.getCustomerEmail.and.returnValue('abc@gmail.com');
    authService.getCustomerName.and.returnValue('abc');
    component.ngOnInit();
   
    expect(component.customerEmail).toBe('abc@gmail.com');
    expect(component.customerName).toBe('abc');
  })
  fit('editProfile',()=>{
     const updatedUser={
      id:"a",
      email:"abcd@gmail.com",
      password:"abcd123",
      token:"edww",
      fullname:"abcd",
      enabled:"true",
      roles:[{id:"",role:"USER"}]
     }
    authService.getCustomerId.and.returnValue('a');
     spyOn(service,'updateProfile').and.callFake(()=>{
      return from([updatedUser]);
    })
    component.editProfile();
    expect(authService.updateName).toHaveBeenCalled();
})
fit('logout',()=>{
  component.logout();
  expect(authService.logout).toHaveBeenCalled();
})
});
