import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import{of} from 'rxjs';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let httpSpy : jasmine.SpyObj<HttpClient>;
  
  const Unassignedorders:any=[
    
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
  },
  { orderId:"c",
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
    
  ]
  const washers:any=[
      {"email":"ramya@gmail.com","fullname":"Ramya"},
      {"email":"ram@gmail.com","fullname":"Ram"}
    ]
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
    httpSpy=jasmine.createSpyObj('HttpClient',['get','put','delete','post']);
    service = new AdminService(httpSpy);
  })
  fit('should return unassigned orders when getUnassignedOrders is called',()=>{
    httpSpy.get.and.returnValue(of(Unassignedorders));
    service.getUnassignedOrders().subscribe({
      next:(orders)=>{
      expect(orders).toEqual(Unassignedorders);
      expect(httpSpy.get).toHaveBeenCalledTimes(1);
    },
    error:()=>{}
  })
 })
  fit('should return washers when getWashers is called',()=>{
    httpSpy.get.and.returnValue(of(washers));
    service.getWashers().subscribe({
      next:(Washers)=>{
      expect(Washers).toEqual(washers);
      expect(httpSpy.get).toHaveBeenCalledTimes(1);
    },
    error:()=>{}
  })
})
fit('should assign washer when assignWasher is called',()=>{
  const AssignedOrder:any={
    orderId:"a",
    userEmailId:"1",
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
  httpSpy.put.and.returnValue(of(AssignedOrder));
  service.assignWasher("a","Ramya").subscribe({
    next: (order)=>{
      expect(order).toEqual(AssignedOrder);
  },
  error:()=>{}
})
})
fit('should return washpacks when getWashpacks is called',()=>{
  httpSpy.get.and.returnValue(of(washpacks));
  service.getWashPacks().subscribe({
    next:(Washpacks)=>{
    expect(Washpacks).toEqual(washpacks);
    expect(httpSpy.get).toHaveBeenCalledTimes(1);
  },
  error:()=>{}
})
})
fit('should return edited washpack when editWashpack is called',()=>{
  const washpack:any= {
  id:"1",
   name:'p1',
   cost:110,
   description:"wash..",
   image:""
 }
  httpSpy.put.and.returnValue(of(washpack));
  service.editWashpack("1",washpack).subscribe({
    next:(Washpack)=>{
      expect(Washpack).toEqual(washpack);
      expect(httpSpy.put).toHaveBeenCalledTimes(1);
    },
    error:()=>{}
  })
})
fit('should return deleted:true when deleteWashpack is called',()=>{
  httpSpy.delete.and.returnValue(of({deleted:true}));
  service.deleteWashpack("1").subscribe({
    next:(msg:any)=>{
      expect(msg).toEqual({deleted:true});
      expect(msg.deleted).toBe(true);
      expect(httpSpy.delete).toHaveBeenCalledTimes(1);
    },
    error:()=>{}
  })
 })
 fit('should return the washpack that we add when addWashpack is called',()=>{
  const washpack:any= {
   id:"3",
   name:'p3',
   cost:400,
   description:"wash..",
   image:""
}
  httpSpy.post.and.returnValue(of(washpack));
  service.addWashpack(washpack).subscribe(
    {
      next:(Washpack)=>{
        expect(Washpack).toEqual(washpack);
        expect(httpSpy.post).toHaveBeenCalledTimes(1);
      },
      error:()=>{}
    }
  )
 })
 fit('should return updated profile when updateProfile is called',()=>{
 const user={
    fullname:"abcd",
   }
   const updatedUser={
    id:"a",
    email:"abcd@gmail.com",
    password:"abcd123",
    token:"edww",
    fullname:"abcd",
    enabled:"true",
    roles:[{id:"",role:"ADMIN"}]
   }
  httpSpy.put.and.returnValue(of(updatedUser));
  service.updateProfile("a",user).subscribe(
{
  next:(User)=>{
    expect(User).toEqual(updatedUser);
    expect(httpSpy.put).toHaveBeenCalledTimes(1);
  }
}
  )
 })
 
})
