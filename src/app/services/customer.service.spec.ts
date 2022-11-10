import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {of} from 'rxjs'
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(()=>{
    httpSpy=jasmine.createSpyObj('HttpClient',['get','put','post','delete']);
    service= new CustomerService(httpSpy);
  })
  const washpack:any= {
    id:"m",
     name:'p1',
     cost:110,
     description:"wash..",
     image:""
   }
   const order:any=
    {
      orderId:"a",
      userEmailId:"1",
      washerName:"NA",
      washpack:"pack1",
      phoneNo:"1234567890",
      areapincode:"12345",
      status:"Pending", 
      cars:{
        id:"",
        name:"xyz",
        model:"abc",
    },
      addon:"abc",
  }
  const form={
    name:"xyz",
    cost:100,
    mail:"xyz@gmail.com",
    phone:1234567890

   }
   const razorpayResponse={
    secretKey:"hbkbj",
    razorpayOrderId:"buhk",
    applicationFee:"100",
    secretId:"byuhu",
    pgName:"razor1"
   }
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
  const orders:any=[
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
},
{ orderId:"c",
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
const rating={
    id:"m",
    washerName:"Ramya",
    comments:"good",
    rating:5
}
const message="The order with ID -> " + "a" + " is cancelled successfully";
  fit('should return washpack cost when getWashpackCost is called',()=>{
  httpSpy.get.and.returnValue(of(washpack.cost))
    service.getWashpackCost(washpack).subscribe(
      {
        next:(cost)=>{
          expect(cost).toEqual(washpack.cost);
        },
        error:()=>{}
      }
    )
  })
  fit('should return the order when saveOrder is called',()=>{
    const order=
    { 
    userEmailId:"abc@gmail.com",
    washerName:"Ramya",
    washpack:"pack1",
    phoneNo:"1234567890",
    areapincode:"12345",
    cars:{
      id:"",
      name:"xyz",
      model:"abc",
  },
}
    httpSpy.post.and.returnValue(of(order));
    service.saveOrder(order).subscribe({
      next:(Order)=>{
        expect(Order).toEqual(order);
      },
      error:()=>{}
    })
  })
  fit('should return data',()=>{
    httpSpy.post.and.returnValue(of(razorpayResponse));
    service.addOrder(form).subscribe(
      {
        next:(response)=>{
          expect(response).toEqual(razorpayResponse);
          expect(httpSpy.post).toHaveBeenCalledTimes(1);
        },
        error:()=>{}
      }
    )
  })
  fit('should return washpacks when getPacks is called',()=>{
    httpSpy.get.and.returnValue(of(washpacks));
    service.getPacks().subscribe(
      {
        next:(Washpacks)=>{
          expect(Washpacks).toEqual(washpacks);
          expect(httpSpy.get).toHaveBeenCalledTimes(1);
        },
        error:()=>{}
      }
    )
  })
  fit('should return all user orders when getPendingOrders is called',()=>{
    httpSpy.get.and.returnValue(of(orders));
    service.getOrders("abc@gmail.com").subscribe({
      next:(userOrders)=>{
        expect(userOrders).toEqual(orders);
        expect(httpSpy.get).toHaveBeenCalledTimes(1);
      },
      error:()=>{}
    })
  })
  fit('should return msg about cancellation of order when cancelOrder is called',()=>{
    httpSpy.put.and.returnValue(of(message));
    service.cancelOrder(order).subscribe({
      next:(msg)=>{
        expect(msg).toEqual(message);
        expect(httpSpy.put).toHaveBeenCalledTimes(1);
      },
      error:()=>{}
    })
    })
    fit('should return order when getOrderById is called',()=>{
      httpSpy.get.and.returnValue(of(order));
      service.getOrderById("a").subscribe(
        {
          next:(Order)=>{
            expect(Order).toEqual(order);
            expect(httpSpy.get).toHaveBeenCalledTimes(1);
          },
      error:()=>{}
        }
      )
    })
    fit('should return order when updateOrder is called',()=>{
      httpSpy.put.and.returnValue(of(order));
      service.updateOrder("a",order).subscribe({
        next:(updatedOrder)=>{
          expect(updatedOrder).toEqual(order);
          expect(httpSpy.put).toHaveBeenCalledTimes(1);
        },
      error:()=>{}
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
    fit('should return the added rating when giveRatingComment is called',()=>{
     
        httpSpy.post.and.returnValue(of(rating));
        service.giveRatingComment(rating).subscribe(
          {
            next:(Rating)=>{
              expect(Rating).toEqual(rating);
              expect(httpSpy.post).toHaveBeenCalledTimes(1);
            },
            error:()=>{}
          }
        )
      }
    )
    fit('should return updated profile when updateProfile is called',()=>{
      const user={
         fullname:"abcd",
        }
       httpSpy.put.and.returnValue(of(user));
       service.updateProfile("x",user).subscribe(
     {
       next:(User)=>{
         expect(User).toEqual(user);
         expect(httpSpy.put).toHaveBeenCalledTimes(1);
       }
     })
    })
    fit('should return washpack when getWashpackById is called',()=>{
      httpSpy.get.and.returnValue(of(washpack));
      service.getWashpackById("m").subscribe({
        next:(Washpack)=>{
        expect(Washpack).toEqual(washpack);
        expect(httpSpy.get).toHaveBeenCalledTimes(1);
      },
      error:()=>{}
    })
    })
});
