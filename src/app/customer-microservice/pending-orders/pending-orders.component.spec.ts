import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminService } from 'src/app/services/admin.service';
import { AdminauthService } from 'src/app/services/adminauth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerauthService } from 'src/app/services/customerauth.service';
import{of,throwError} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PendingOrdersComponent } from './pending-orders.component';
import { Component } from '@angular/core';
import Swal, { SweetAlertCustomClass } from 'sweetalert2';
import { Router } from '@angular/router';

describe('PendingOrdersComponent', () => {
  let component: PendingOrdersComponent;
  let service : jasmine.SpyObj<CustomerService>;
  let authService:jasmine.SpyObj<CustomerauthService>;
  let router:Router;
  const orders:any=[
    {
      orderId:"a",
      userEmailId:"abc@gmail.com",
      washerName:"name1",
      washpack:"pack1",
      phoneNo:"1234567890",
      areapincode:"12345",
      status:"Pending",
      cars:{
        id:"m",
        name:"xyz",
        model:"abc",
    },
      addon:"abc",
  },
  {
    orderId:"b",
    userEmailId:"abc@gmail.com",
    washerName:"name1",
    washpack:"Pack1",
    phoneNo:"1234567890",
    areapincode:"12345",
    status:"Pending",
    cars:{
      id:"m",
      name:"xyz",
      model:"abc",
  },
    addon:"abc",
},
{
  orderId:"b",
  userEmailId:"abc@gmail.com",
  washerName:"name1",
  washpack:"pack2",
  phoneNo:"1234567890",
  areapincode:"12345",
  status:"Pending",
  cars:{
    id:"m",
    name:"xyz",
    model:"abc",
},
  addon:"abc",
}]
const Updatedorder:any=
    {
      orderId:"b",
      userEmailId:"abc@gmail.com",
      washerName:"",
      washpack:"pack1",
      phoneNo:"1234567890",
      areapincode:"12345",
      status:"Pending", 
      cars:{
        id:"m",
        name:"BMW",
        model:"X5",
    },
      addon:"abc",
  }
    
beforeEach(()=>{
  service=jasmine.createSpyObj('AdminService',['getOrders','cancelOrder','updateOrder','giveRatingComment']);
  authService= jasmine.createSpyObj('CustomerauthService',['getRole','getCustomerEmail']);
  component=new PendingOrdersComponent(service,authService,router);
})
fit('ngOninit when atleast one order exist',()=>{
  authService.getRole.and.returnValue("USER");
  authService.getCustomerEmail.and.returnValue("abcd@gmail.com");
  service.getOrders.and.returnValue(of(orders));
  component.ngOnInit();
  expect(component.orders).toBe(orders);
  expect(component.orderCount).toBe(3);
  expect(component.flag).toBe(false);
})
fit('ngOninit when no orders exist',()=>{
  const orders:any=[];
  authService.getRole.and.returnValue("USER");
  authService.getCustomerEmail.and.returnValue("abcd@gmail.com");
  service.getOrders.and.returnValue(of(orders));
  component.ngOnInit();
  expect(component.orders).toBe(orders);
  expect(component.orderCount).toBe(0);
  expect(component.flag).toBe(true);
})
fit('should not return any orders',()=>{
  const orders:any=[];
component.washpack="";
spyOn(component,'ngOnInit').and.callFake(()=>{
  service.getOrders.and.returnValue(of(orders));
})
component.Search();
expect(component.ngOnInit).toHaveBeenCalledTimes(1);
})
fit('should return orders of given washpack',()=>{
  component.washpack="pack1";
  component.orders=orders;
  component.Search();
  expect(component.orders.length).toBe(2);
  })
  fit('hiding the order on page to show that is deleted',()=>{
    component.orders=orders;
    component.orderCount=1;
    component.hide(1);
    expect(component.orders.length).toBe(2);
    expect(component.flag).toBe(true);
  })
  xit('should call done function after confirming to the cancel order',()=>{
    //const sweetalert2=require('sweetalert2');
  let sweetalert2:jasmine.SpyObj<SweetAlertCustomClass>;

   jasmine.createSpyObj("sweetalert2",()=>{
    fire:jasmine.createSpy().and.returnValue({isConfirmed:true});
   })
   //spyOn(component.done,'done').arguments(orders[1]);
   component.cancelOrder(orders[1]);
   expect(Swal.fire).toHaveBeenCalled();
   //expect(component.done).toHaveBeenCalledTimes(1);
  })
  fit('should throw server error',()=>{
 service.cancelOrder.and.returnValue(throwError(()=> new HttpErrorResponse({status:500,statusText:'server error'})));
 component.done(orders[1]);
 expect(service.cancelOrder).toHaveBeenCalledTimes(1);
  })
  fit('the order should be cancelled',()=>{
    service.cancelOrder.and.returnValue(of("The order with ID -> ' b ' is cancelled successfully"));
    component.done(orders[1]);
    expect(service.cancelOrder).toHaveBeenCalledTimes(1);
  })
  fit('should throw server error',()=>{
    service.updateOrder.and.returnValue(throwError(()=> new HttpErrorResponse({status:500,statusText:'server error'})));
    component.updateOrder("b",Updatedorder);
    expect(service.updateOrder).toHaveBeenCalledTimes(1);
     })
     fit('should return updated order when updateOrder is called',()=>{
         service.updateOrder.and.returnValue(of(Updatedorder));
       component.updateOrder("b",Updatedorder);
       expect(service.updateOrder).toHaveBeenCalledTimes(1);
     })
   fit('rating should be saved after giving',()=>{
      component.onClick(1);
      expect(component.rating).toBe(2);
      expect(component.Rating.rating).toBe(2);
    })
    fit('should throw server error',()=>{
      service.giveRatingComment.and.returnValue(throwError(()=> new HttpErrorResponse({status:500,statusText:'server error'})));
      component.addRatingComment();
      expect(service.giveRatingComment).toHaveBeenCalledTimes(1);
       })
       fit('should return rating object when addRatingComment is called',()=>{
        const rating={
          washerName:"Ramya",
          comments:"good",
          rating:"4"
        }
           service.giveRatingComment.and.returnValue(of(rating));
           component.addRatingComment();
           expect(service.giveRatingComment).toHaveBeenCalledTimes(1);
       })
});

