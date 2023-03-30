import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerauthService } from 'src/app/services/customerauth.service';
import { Car } from './CarInfo';
import { OrderInfo } from './OrderInfo';
import { AnyForUntypedForms, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})

export class PendingOrdersComponent implements OnInit {
  error:boolean=false;
  errorType:any;
  p:number=1;
  washpack:any;
  orderCount:any;
  flag:any;
  order:any;
  orders:any=[];
  email:any;
  field:any;
  x:Car={
    name:"",
    model:""
  }
  Order:OrderInfo={
   
    orderId:"",
    userEmailId:"",
    washerName:"",
    washpack:"",
    phoneNo:NaN,
    areapincode:"",
    cars:this.x,
    addon:"",
     }
     Rating={
      image:"",
      washerName:"",
      comments:"",
      rating:0
     }

     rating=0;
     starCount=5;
     ratingArr:boolean[]=[];//true=solid star, false= empty star
     updateform= new FormGroup({
      phoneNo: new FormControl('',Validators.required),
      Address:new FormControl('',Validators.required),
      car:new FormControl('',Validators.required),
      cartype:new FormControl('',Validators.required),
      addon:new FormControl('',Validators.nullValidator),
     })

     ratingform=new FormGroup(
      {
        feedback:new FormControl('',Validators.required)
      }
     )
 
  constructor(private customer:CustomerService, private customerAuth:CustomerauthService,private router:Router) {
}
role:any;
  ngOnInit(): void {
    this.role=this.customerAuth.getRole();
    this.email=this.customerAuth.getCustomerEmail();
    this.customer.getOrders(this.email)
    .pipe((catchError((err:HttpErrorResponse)=>{
      this.error=true;
      if(err.status==500 || err.status==503){
        this.errorType="server error";
        console.log(this.errorType)
      }
      if(err.status==403){
        console.log("session expired");
        sessionStorage.clear();
       this.router.navigate(['/customerLogin']);
      }
      return throwError(()=>err)})))
    .subscribe((orders)=>{
      this.orders=orders;
      if(this.orders.length==0){
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
    this.ratingArr=Array(this.starCount).fill(false);
   
  }
  Search(){
    if(this.washpack==""){
      this.ngOnInit();
    }
    else{
      this.orders=this.orders.filter((res:OrderInfo)=>{
      return res.washpack.toLocaleLowerCase().match(this.washpack.toLocaleLowerCase());
      });
    }
  }


  hide(i:number){
    Swal.fire({
      position : 'top-end',
        icon:'success',
        title:'deleted',
      showConfirmButton:false,
      timer: 2000,
      })
    this.orders.splice(i,1);
    this.orderCount=this.orderCount-1;
    console.log(this.orderCount);
    if(this.orderCount==0){
      this.flag=true;
    }
   }
    cancelOrder(order:Object){
    Swal.fire({
      title: 'Cancel Order?',
      text: "Your order will be cancelled",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText:'back',
      cancelButtonColor: '#d33',
      confirmButtonText: 'CancelOrder'
    }).then((result) => {
      if (result.isConfirmed) {
        this.done(order);
      }
    })
}

  done(order:Object){
     this.customer.cancelOrder(order)
     .pipe((catchError((err:HttpErrorResponse)=>{
      this.error=true;
      if(err.status==500 || err.status==503){
        this.errorType="server error";
        console.log(this.errorType)
      }
      if(err.status==403){
        console.log("session expired");
        sessionStorage.clear();
       this.router.navigate(['/customerLogin']);
      }
      return throwError(()=>err)})))
     //.pipe(catchError((err:HttpErrorResponse)=>{
    //   Swal.fire({
    //   position : 'top-end',
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'server error, Try again',
    //   footer: '<a href="">Try Again</a>'
    //   })
    //  return "server error";
    //  }))
     .subscribe({
      next:(message)=>{
        console.log(message);
        Swal.fire({
          position : 'top-end',
          icon:'success',
          title:'Cancelled successfully',
          showConfirmButton:false,
          timer: 2000,
      })
      },
    error:(err:HttpErrorResponse)=>{
        Swal.fire({
      position : 'top-end',
      icon: 'error',
      title: 'Oops...',
      text: 'server error, Try again',
      
      })
    }})
  }

   updateOrder(OrderId:String,Order:Object){
    this.customer.updateOrder(OrderId,Order)
    .pipe((catchError((err:HttpErrorResponse)=>{
      this.error=true;
      if(err.status==500 || err.status==503){
        this.errorType="server error";
        console.log(this.errorType)
      }
      if(err.status==403){
        console.log("session expired");
        sessionStorage.clear();
       this.router.navigate(['/customerLogin']);
      }
      return throwError(()=>err)})))
     .subscribe({
      next:(updatedOrder)=>{
    console.log(updatedOrder)
    Swal.fire({
      position : 'top-end',
        icon:'success',
        title:'Updated',
      showConfirmButton:false,
      timer: 2000,
      })
   },
   error:()=>{
    Swal.fire({
        position : 'top-end',
        icon: 'error',
      title: 'Oops...',
      text: 'not updated, try again',
     
      })
  }}
  )}
   edit(order:any){
    this.Order=order;
      let a = document.querySelector('.popup') as HTMLElement
       a.style.display='flex';
     }
   addRating(washerName:string){
    this.Rating.washerName=washerName;
    let a = document.querySelector('.popup-rating') as HTMLElement
      a.style.display='flex';
   }

   closeAddRating(){
    let b = document.querySelector('.popup-rating') as HTMLElement
    b.style.display='none';
   }
   close(){
    let b = document.querySelector('.popup') as HTMLElement
    b.style.display='none';
   }

    addRatingDisable(status:String){
    if(status=='Completed'){
      return false;
    }
    else{
      return true;
    }
   }
   cancelOrderDisable(status:String){
    if(status=='Pending'){
      return false;
    }
    else{
      return true;
    }
   }
   updateRatingDisable(status:String){
    if(status=='Pending'){
      return false;
    }
    else{
      return true;
    }
   }

   returnStar(i:number){
    if(this.rating>=i+1){
      return 'star';
    }
    else{
      return 'star_border';
    }
   }
   onClick(i:number){
    this.rating=i+1;
    console.log(this.rating);
    this.Rating.rating=this.rating;
  }
  addRatingComment(){
    console.log(this.Rating);
    this.customer.giveRatingComment(this.Rating)
    .pipe((catchError((err:HttpErrorResponse)=>{
      this.error=true;
      if(err.status==500 || err.status==503){
        this.errorType="server error";
        console.log(this.errorType)
      }
      if(err.status==403){
        console.log("session expired");
        sessionStorage.clear();
       this.router.navigate(['/customerLogin']);
      }
      return throwError(()=>err)})))
     .subscribe({
      next:(response)=>{
      console.log(response);
      Swal.fire({
        position : 'top-end',
          icon:'success',
          title:'Feedback Saved',
        showConfirmButton:false,
        timer: 2000,
        })
    },
  error:()=>{
    Swal.fire({
          position : 'top-end',
          icon: 'error',
        title: 'Oops...',
        text: 'Server Error, Try again',
       
        })
  }
});
  }
   }

