import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { WasherService } from 'src/app/services/washer.service';
import { WasherauthService } from 'src/app/services/washerauth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-washer-orders',
  templateUrl: './washer-orders.component.html',
  styleUrls: ['./washer-orders.component.css']
})
export class WasherOrdersComponent implements OnInit {
  p:number=1;
  orders:any=[];
  //array:any=[];
  orderCount:any;
  flag:any;
  washerName:any;
  role:any;
  constructor(private washer:WasherService,private washerAuth:WasherauthService) { 
    this.role=this.washerAuth.getRole();
    this.washerName=this.washerAuth.getWasherName();
    this.washer.getPendingOrders(this.washerName).subscribe(orders=>{
      console.log(orders);
      this.orders=orders;
      console.log(this.orders);
      if(this.orders.length==0){
           console.log(this.orders.length);
        this.orderCount=this.orders.length;
        this.flag=true;

    }
    else{
      
      this.orderCount=this.orders.length;
      this.flag=false;
      console.log(this.orderCount);
    }
    console.log(orders);
      //this.array=orders;
     // console.log(this.orders);
    })
  }
  
  // hide(i:number){
    
  //   console.log(this.array);
  //   this.orders.splice(i,1);

  // }
  order:any;
  status(i:String,index:number){
   
    this.washer.updateStatus(i).pipe(catchError((err:HttpErrorResponse)=>{
    
      
      Swal.fire({
        position : 'top-end',
        icon: 'error',
      title: 'Oops...',
      text: 'status not updated, try again',
      footer: '<a href="">Try Again</a>'
      })
     return "server error";
     
     
    })).subscribe(order=>{
      this.order=order;
      console.log(this.order);
    console.log(this.order.status);
    Swal.fire({
      position : 'top-end',
        icon:'success',
        title:'Status updated successfully',
      showConfirmButton:false,
      timer: 1000,
      })
      this.orders.splice(index,1);
      this.orderCount=this.orderCount-1;
      if(this.orderCount==0){
        this.flag=true;
      }
      else{
        
      }
    })
    
  }
         
  reject(id:String,index:number){
    
    Swal.fire({
      title: 'Reject Order?',
      text: "order will be rejected",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reject'
    }).then((result) => {
      if (result.isConfirmed) {
        this.done(id,index);
      }
    })
  
}
  done(id:String,index:number){
this.washer.rejectOrder(id).pipe(catchError((err:HttpErrorResponse)=>{
    
      
  Swal.fire({
    position : 'top-end',
    icon: 'error',
  title: 'Oops...',
  text: 'not able to reject, try again',
  footer: '<a href="">Try Again</a>'
  })
 return "server error";
 
 
})).subscribe(order=>{
  this.order=order;
  console.log(this.order);
  Swal.fire({
    position : 'top-end',
      icon:'success',
      title:'Rejected successfully',
    showConfirmButton:false,
    timer: 1000,
    })
    this.orders.splice(index,1);
    this.orderCount=this.orderCount-1;
      if(this.orderCount==0){
        this.flag=true;
      }
  
})

  }
  ngOnInit(): void {
  }
  completed(i:String,index:number){
    
    Swal.fire({
      title: 'Assign to order?',
      text: "Your order will be confirmed",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'completed'
    }).then((result) => {
      if (result.isConfirmed) {
        this.status(i,index);
      }
    })
  
  }

}
