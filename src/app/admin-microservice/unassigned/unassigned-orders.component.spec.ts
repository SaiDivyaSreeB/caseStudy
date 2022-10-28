import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import {from, of} from 'rxjs';
import { UnassignedOrdersComponent } from './unassigned.component';
import { HttpClient } from '@angular/common/http';
import { AdminauthGuardService } from 'src/app/services/adminauth-guard.service';

describe('UnassignedOrdersComponent', () => {
  let component!: UnassignedOrdersComponent;
  let fixture: ComponentFixture<UnassignedOrdersComponent>;
    let service!: AdminService;
    let router!:Router;
  let http:HttpClient;
    const orders:any=[
      {
        userEmailId:"1",
        washerName:"name1",
        washpack:"pack1",
        phoneNo:"1234567890",
        areapincode:"12345",
        // status:String;
        cars:{
          id:"100",
          name:"xyz",
          model:"abc",
      },
        addon:"abc",
    },
    {
      userEmailId:"1",
      washerName:"name1",
      washpack:"pack1",
      phoneNo:"1234567890",
      areapincode:"12345",
      // status:String;
      cars:{
        id:"100",
        name:"xyz",
        model:"abc",
    },
      addon:"abc",
  },
  {
    userEmailId:"1",
    washerName:"name1",
    washpack:"pack1",
    phoneNo:"1234567890",
    areapincode:"12345",
    // status:String;
    cars:{
      id:"100",
      name:"xyz",
      model:"abc",
  },
    addon:"abc",
},
    
  ]
    
    beforeEach(()=>{
      service = new AdminService(http);
      component = new UnassignedOrdersComponent(service,router);
    })
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ UnassignedOrdersComponent ]
  //   })
  //   .compileComponents();
  // });

  //beforeEach(() => {
    // fixture = TestBed.createComponent(UnassignedOrdersComponent);
    // component = fixture.componentInstance;
  //   fixture.detectChanges();
  //});

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  fit('should display unassigned orders',()=>{
  //  fixture= TestBed.createComponent(UnassignedOrdersComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
    spyOn(service,'getUnassignedOrders').and.callFake(()=>{
      return from ([orders]); })
      
      component.ngOnInit();
      expect(component.orders).toEqual(orders);
      expect(component.orderCount).toBe(3);
      expect(component.flag).toBe(false);
  })
  xit('should display unassigned orders',()=>{
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
    const navigate={
      navigate: () => of(null)
    };
    let router ={
     
      navigate:jasmine.createSpy('navigate')
      }
      // TestBed.configureTestingModule({
      //   declarations:[UnassignedOrdersComponent],
      // providers:[{provide:Router,useValue:router}]});
      // fixture = TestBed.createComponent(UnassignedOrdersComponent);
      // component = fixture.componentInstance;
      // })
      component.assign(order);
      //expect(AdminauthGuardService.CanActivate(<any>{},<any>{})).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['admin/unassigned',"a"])
     })
});
