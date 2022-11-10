import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WasherService } from 'src/app/services/washer.service';
import { WasherauthService } from 'src/app/services/washerauth.service';
import {of} from 'rxjs';
import { UnassignedOrdersComponent } from './unassigned-orders.component';

describe('UnassignedOrdersComponent', () => {
  let component: UnassignedOrdersComponent;
  let authService:jasmine.SpyObj<WasherauthService>;
  let service:jasmine.SpyObj<WasherService>;
  const orders:any=[
    {
      orderId:"a",
      userEmailId:"abc@gmail.com",
      washerName:"NA",
      washpack:"pack1",
      phoneNo:"1234567890",
      areapincode:"12345",
      status:"Pending",
      cars:{
        id:"100",
        name:"xyz",
        model:"abc",
    },
      addon:"abc",
  },
  {
    orderId:"b",
    userEmailId:"abc@gmail.com",
    washerName:"NA",
    washpack:"pack1",
    phoneNo:"1234567890",
    areapincode:"12345",
    status:"Pending",
    cars:{
      id:"100",
      name:"xyz",
      model:"abc",
  },
    addon:"abc",
},
{
  orderId:"c",
  userEmailId:"abc@gmail.com",
  washerName:"NA",
  washpack:"pack1",
  phoneNo:"1234567890",
  areapincode:"12345",
   status:"Pending",
  cars:{
    id:"100",
    name:"xyz",
    model:"abc",
},
  addon:"abc",
},]
  beforeEach(()=>{
    service=jasmine.createSpyObj('WasherService',['getUnassigned','assignHimself']);
    authService=jasmine.createSpyObj('WasherauthService',['getWasherName','getRole']);
    component=new UnassignedOrdersComponent(service,authService);
  })
fit('ngOnInit for orders count zero',()=>{
  const orders:any=[];
  authService.getRole.and.returnValue("WASHER");
  service.getUnassigned.and.returnValue(of(orders));
  component.ngOnInit();
  expect(component.orderCount).toBe(0);
  expect(component.flag).toBe(true);
})
fit('ngOnInit',()=>{
  authService.getRole.and.returnValue("WASHER");
  service.getUnassigned.and.returnValue(of(orders));
  component.ngOnInit();
  expect(component.orderCount).toBe(3);
  expect(component.flag).toBe(false);
})
fit('should return order when assign function is called',()=>{
  const order={
    orderId:"c",
    userEmailId:"abc@gmail.com",
    washerName:"Ramya",
    washpack:"pack1",
    phoneNo:"1234567890",
    areapincode:"12345",
     status:"Pending",
    cars:{
      id:"100",
      name:"xyz",
      model:"abc",
  },
    addon:"abc",
  }
  authService.getWasherName.and.returnValue("Ramya");
  service.assignHimself.and.returnValue(of(order));
  component.orders=orders;
  component.orderCount=3;
  component.assign("c",2);
  expect(component.orders.length).toBe(2);
  expect(component.orderCount).toBe(2);
  expect(component.washerName).toBe("Ramya");
})
});
