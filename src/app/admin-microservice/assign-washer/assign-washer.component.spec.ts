import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import{of} from 'rxjs';
import { AssignWasherComponent } from './assign-washer.component';
import { AnimationDriver } from '@angular/animations/browser';
import { getHeapSnapshot } from 'v8';

describe('AssignWasherComponent', () => {
  let component: AssignWasherComponent;
  let router: any;
  let service:jasmine.SpyObj<AdminService>;
  const washers:any=[
    {"email":"ramya@gmail.com","fullname":"Ramya"},
    {"email":"ram@gmail.com","fullname":"Ram"}
  ]
  const order:any= { 
  orderId:"a",
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
}
  beforeEach(()=>{
    router=new ActivatedRoute();
    service=jasmine.createSpyObj('AdminService',['getWashers','assignWasher']);
   // router=jasmine.createSpyObj('ActivatedRoute',['snapshot',['paramMap',['get']]]);
    component=new AssignWasherComponent(service,router);
  })
  fit('should return washers',()=>{
    service.getWashers.and.returnValue(of(washers));
    component.ngOnInit();
    expect(component.washers).toEqual(washers);
  })
  xit('should return the order after the washer is assigned',()=>{
    service.assignWasher.and.returnValue(of(order));
    let fakeObject1=jasmine.createSpyObj("fakeObject1",['get']);
    let fakeObject=jasmine.createSpyObj("fakeObject1",['paramMap']);
    spyOn(router,'snapshot').and.returnValue(fakeObject);
    expect(fakeObject1.get).toHaveBeenCalled();
   //router.snapshot.paramMap.get('id')?.match("a");
    component.assign("Ramya");
    expect(component.id).toBe("a");
    
  })
});
