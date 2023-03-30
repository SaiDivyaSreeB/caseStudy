import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
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
  error:boolean=false;
  errorType:any;
  constructor(private washer:WasherService,private washerAuth:WasherauthService, private router:Router) { 
  }
  order:any;
  status(i:String,index:number){
    this.washer.updateStatus(i)
    .subscribe({
      next:(order)=>{
      this.order=order;
      console.log(this.order);
    console.log(this.order.status);
    Swal.fire({
      position : 'top-end',
        icon:'success',
        title:'Status updated successfully',
      showConfirmButton:false,
      timer: 2000,
      })
      this.orders.splice(index,1);
      this.orderCount=this.orderCount-1;
      if(this.orderCount==0){
        this.flag=true;
      }
      else{}
    },
  error:()=>{
    Swal.fire({
      position : 'top-end',
      icon: 'error',
    title: 'Oops...',
    text: 'status not updated, try again',
    })
  }})
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
this.washer.rejectOrder(id)
.subscribe({
  next:(order)=>{
  this.order=order;
  console.log(this.order);
  Swal.fire({
    position : 'top-end',
      icon:'success',
      title:'Rejected successfully',
    showConfirmButton:false,
    timer: 2000,
    })
    this.orders.splice(index,1);
    this.orderCount=this.orderCount-1;
      if(this.orderCount==0){
        this.flag=true;
      }
},
error:()=>{
    Swal.fire({
    position : 'top-end',
    icon: 'error',
  title: 'Oops...',
  text: 'not able to reject, try again',
  })
}})
}
  ngOnInit(): void {
    this.role=this.washerAuth.getRole();
    this.washerName=this.washerAuth.getWasherName();
    this.washer.getPendingOrders(this.washerName)
    .pipe((catchError((err:HttpErrorResponse)=>{
      this.error=true;
      if(err.status==500 || err.status==503){
        this.errorType="server error";
        console.log(this.errorType)
      }
      if(err.status==403||err.status==401){
        this.errorType="unauthorised error"
        console.log("session expired");
        sessionStorage.clear();
       this.router.navigate(['/washerLogin']);
      }
      return throwError(()=>err)})))
    .subscribe(orders=>{
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
    })
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
