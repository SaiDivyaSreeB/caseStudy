import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminauthService } from 'src/app/services/adminauth.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-unassigned',
  templateUrl: './unassigned.component.html',
  styleUrls: ['./unassigned.component.css']
})

export class UnassignedOrdersComponent implements OnInit {
  error:boolean=false;
  errorType:any;
  p:number=1;
  orders:any=[];
  orderCount:any;
  flag:any;
  constructor(private admin:AdminService, private router:Router,private adminAuth:AdminauthService) {
//     this.admin.getUnassignedOrders().subscribe((orders)=>{
//       this.orders=orders;
//       console.log(orders);
//       if(this.orders.length==0){
//         console.log(this.orders.length);
//      this.orderCount=this.orders.length;
//      this.flag=true;

//  }
//  else{
   
//    this.orderCount=this.orders.length;
//    this.flag=false;
//    console.log(this.orderCount);
//  }
//     })
   }
role:any;
  ngOnInit(): void {
    this.role=this.adminAuth.getRole();
    this.admin.getUnassignedOrders()
    .pipe((catchError((err:HttpErrorResponse)=>{
      this.error=true;
      if(err.status==500 || err.status==503){
        this.errorType="server error";
        console.log(this.errorType)
      }
      if(err.status==403){
        this.errorType="unauthorised error"
        console.log("session expired");
        sessionStorage.clear();
       this.router.navigate(['/adminLogin']);
      }
      return throwError(()=>err)})))
   
    .subscribe((orders)=>{
      this.orders=orders;
      console.log(orders);
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
    })
  }
assign(order:any){
  this.router.navigate(['admin/unassigned',order.orderId]);
}

       



}
