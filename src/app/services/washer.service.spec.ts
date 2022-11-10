import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import{of} from 'rxjs';
import { WasherService } from './washer.service';

describe('WasherService', () => {
  let service: WasherService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  const pendingOrders:any=[
    {
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
      addon:"abc",
  },
  { orderId:"b",
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
}]
const unassignedOrders:any=[
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
{ orderId:"b",
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
}]
const ratings=[
  {
    id:"m",
    washerName:"Ramya",
    comments:"good",
    rating:5
},
{
  id:"n",
  washerName:"Ram",
  comments:"good",
  rating:4
}]
  beforeEach(()=>{
    httpSpy=jasmine.createSpyObj('HttpClient',['get','put']);
    service = new WasherService(httpSpy);
  })
  fit('should return pending orders when getPendingOrders is called',()=>{
    httpSpy.get.and.returnValue(of(pendingOrders));
    service.getPendingOrders("Ramya").subscribe(
      {
        next:(orders)=>{
          expect(orders).toEqual(pendingOrders);
          expect(httpSpy.get).toHaveBeenCalledTimes(1);
        },
        error:()=>{}
      }
    )
  })
  fit('should return the order with status as rejected when rejectOrder is called',()=>{
    const Cancelledorder=
      {
        orderId:"a",
        userEmailId:"abc@gmail.com",
        washerName:"Ramya",
        washpack:"pack1",
        phoneNo:"1234567890",
        areapincode:"12345",
        status:"Rejected",
        cars:{
          id:"100",
          name:"xyz",
          model:"abc",
      },
        addon:"abc",
    }
    httpSpy.get.and.returnValue(of(Cancelledorder));
    service.rejectOrder("a").subscribe(
      {
        next:(Order)=>{
          expect(Order).toEqual(Cancelledorder);
          expect(httpSpy.get).toHaveBeenCalledTimes(1);
        },
        error:()=>{}
      }
    )
  })
  fit('should return the order with status as completed when updateStatus is called',()=>{
    const Completedorder=
    {
      orderId:"a",
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
    httpSpy.get.and.returnValue(of(Completedorder));
    service.updateStatus("a").subscribe(
      {
        next:(Order)=>{
          expect(Order).toEqual(Completedorder);
          expect(httpSpy.get).toHaveBeenCalledTimes(1);
        },
        error:()=>{}
      }
    )
  })
  fit('should return unassigned orders when getUnassignedOrders is called',()=>{
    httpSpy.get.and.returnValue(of(unassignedOrders));
    service.getUnassigned().subscribe(
      {
        next:(orders)=>{
          expect(orders).toEqual(unassignedOrders);
        },
        error:()=>{}
      }
    )
  })
  fit('should return the order with washer assigned when assignWasher is called',()=>{
    const order={ 
    orderId:"b",
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
  }
 }
 
  httpSpy.put.and.returnValue(of(order));
  service.assignHimself("b","Ramya").subscribe({
    next:(Order)=>{
      expect(Order).toEqual(order);
      expect(httpSpy.put).toHaveBeenCalledTimes(1);
    },
    error:()=>{}
  })
  })
  fit('should return updated profile when updateProfile is called',()=>{
    const user={
       fullname:"abcd",
      }
     httpSpy.put.and.returnValue(of(user));
     service.updateProfile("a",user).subscribe(
   {
     next:(User)=>{
       expect(User).toEqual(user);
       expect(httpSpy.put).toHaveBeenCalledTimes(1);
     }
   })
    })
    fit('should return list of ratings when viewRatings is called',()=>{
      httpSpy.get.and.returnValue(of(ratings));
      service.viewRatings().subscribe(
        {
          next:(Ratings)=>{
            expect(Ratings).toEqual(ratings);
            expect(httpSpy.get).toHaveBeenCalledTimes(1);
          },
          error:()=>{}
        }
      )
    })
});
