import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import {from, of} from 'rxjs';
import { UnassignedOrdersComponent } from './unassigned.component';
import { HttpClient } from '@angular/common/http';
import { AdminauthGuardService } from 'src/app/services/adminauth-guard.service';
import { AdminauthService } from 'src/app/services/adminauth.service';

describe('UnassignedOrdersComponent', () => {
  let component!: UnassignedOrdersComponent;
  let fixture: ComponentFixture<UnassignedOrdersComponent>;
    let service!: AdminService;
    let authService!:jasmine.SpyObj<AdminauthService>;
    let routerSpy:jasmine.SpyObj<Router>;
    //let Router!:Router;
  let http:HttpClient;
  
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
     
      routerSpy=jasmine.createSpyObj('Router',['navigate']);
      authService=jasmine.createSpyObj('AdminauthService',['getRole']);
      service = new AdminService(http);
      component = new UnassignedOrdersComponent(service,routerSpy,authService);
      
    })
   fit('should display unassigned orders',()=>{
 authService.getRole.and.returnValue(('ADMIN'));
//spyOn(authService,'getRole').and.returnValue('ADMIN');
spyOn(service,'getUnassignedOrders').and.callFake(()=>{
      return from ([orders]); })
    component.ngOnInit();
      expect(component.orders).toEqual(orders);
      expect(component.orderCount).toBe(3);
      expect(component.flag).toBe(false);
  })
  fit('should display unassigned orders',()=>{
    authService.getRole.and.returnValue(('ADMIN'));
   const orders:any=[]
      spyOn(service,'getUnassignedOrders').and.callFake(()=>{
        return from ([orders]); })
        component.ngOnInit();
        expect(component.orders).toEqual(orders);
        expect(component.orderCount).toBe(0);
        expect(component.flag).toBe(true);
    })
     fit('should navigate to assign order component',()=>{
      let order={
        orderId:"a",
        userEmailId:"1",
        washerName:"name1",
        washpack:"pack1",
        phoneNo:"1234567890",
        areapincode:"12345",
        // status:String;
        cars:{
          id:100,
          name:"xyz",
          model:"abc",
      },
        addon:"abc",
    }
      component.assign(order);
      expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['admin/unassigned',"a"])
     })
});
