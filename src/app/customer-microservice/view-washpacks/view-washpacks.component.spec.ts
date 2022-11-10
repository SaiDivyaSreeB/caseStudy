import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerauthService } from 'src/app/services/customerauth.service';
import {of} from 'rxjs';
import { ViewWashpacksComponent } from './view-washpacks.component';

describe('ViewWashpacksComponent', () => {
  let component: ViewWashpacksComponent;
  let service:jasmine.SpyObj<CustomerService>;
  let authService:jasmine.SpyObj<CustomerauthService>;
  let router:jasmine.SpyObj<Router>;
  const washpacks:any=[
    {
      id:"1",
       name:'p1',
       cost:100,
       description:"wash..",
      image:""
    },
    {
     id:"2",
     name:'p2',
     cost:200,
     description:"wash2..",
     image:""
  }
  ];
  beforeEach(()=>{
    service=jasmine.createSpyObj('CustomerService',['getPacks']);
    authService=jasmine.createSpyObj('CustomerauthService',['getRole']);
    router=jasmine.createSpyObj('Router',['navigate']);
    component=new ViewWashpacksComponent(service,router,authService);
  })
  fit('ngOninit',()=>{
    authService.getRole.and.returnValue("USER");
    service.getPacks.and.returnValue(of(washpacks));
    component.ngOnInit();
    expect(component.Washpacks).toEqual(washpacks);
  })   
fit('should navigate to placeOrderComponent',()=>{
  component.placeOrder("1");
  expect(router.navigate).toHaveBeenCalledOnceWith(['customer/placeOrder',"1"]);
}) 
});
