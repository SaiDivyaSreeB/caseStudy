import { ComponentFixture, TestBed } from '@angular/core/testing';
import {of,throwError} from 'rxjs';
import { WasherService } from 'src/app/services/washer.service';
import { WasherauthService } from 'src/app/services/washerauth.service';
import { WasherOrdersComponent } from './washer-orders.component';
import {HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
describe('WasherOrdersComponent', () => {
  let component: WasherOrdersComponent;
  let service:jasmine.SpyObj<WasherService>;
  let authService:jasmine.SpyObj<WasherauthService>;
  let router:Router;
  const orders:any=[
{
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
},]
  beforeEach(()=>{
    service=jasmine.createSpyObj('WasherService',['getPendingOrders','rejectOrder','updateStatus']);
    authService=jasmine.createSpyObj('WasherauthService',['getWasherName','getRole']);
    component=new WasherOrdersComponent(service,authService,router);
  })
  fit('ngOnInit when orders count is zero',()=>{
    const orders:any=[];
    authService.getRole.and.returnValue("WASHER");
    authService.getWasherName.and.returnValue("Ramya");
    service.getPendingOrders.and.returnValue(of(orders));
    component.ngOnInit();
    expect(component.orders).toEqual(orders);
    expect(component.orderCount).toBe(0);
    expect(component.flag).toBe(true);
  })
  fit('ngOnInit when orders count is zero',()=>{
    authService.getRole.and.returnValue("WASHER");
    authService.getWasherName.and.returnValue("Ramya");
    service.getPendingOrders.and.returnValue(of(orders));
    component.ngOnInit();
    expect(component.orders).toEqual(orders);
    expect(component.orderCount).toBe(1);
    expect(component.flag).toBe(false);
  })
  fit('should return the rejected order',()=>{
      const rejectedOrder={
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
      }
      service.rejectOrder.and.returnValue(of(rejectedOrder));
      component.orders=orders;
      component.orderCount=1;
      component.done("c",0);
      expect(component.orders.length).toBe(0);
      expect(component.flag).toBe(true);
      expect(service.rejectOrder).toHaveBeenCalledTimes(1);
    })
    fit('should return server error',()=>{
      service.rejectOrder.and.returnValue(throwError(()=> new HttpErrorResponse({status:500,statusText:'server error'})));
      service.updateStatus.and.returnValue(throwError(()=> new HttpErrorResponse({status:500,statusText:'server error'})));
      component.done("c",0);
      component.status("c",0);
      expect(service.rejectOrder).toHaveBeenCalledTimes(1);
      expect(service.rejectOrder).toHaveBeenCalledTimes(1);
    })
    fit('order should be return when status function is called',()=>{
      const order={
        orderId:"c",
        userEmailId:"abc@gmail.com",
        washerName:"Ramya",
        washpack:"pack1",
        phoneNo:"1234567890",
        areapincode:"12345",
         status:"Completed",
        cars:{
          id:"100",
          name:"xyz",
          model:"abc",
      },
        addon:"abc",
      }
      service.updateStatus.and.returnValue(of(order));
      component.orders=orders;
      component.orderCount=1;
      component.status("c",0);
      expect(component.orders.length).toBe(0);
      expect(component.orderCount).toBe(0);
      expect(component.flag).toBe(true);
      expect(component.order).toEqual(order);
    })
});

