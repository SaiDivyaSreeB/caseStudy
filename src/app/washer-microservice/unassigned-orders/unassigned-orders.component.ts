import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { WasherService } from 'src/app/services/washer.service';
import { WasherauthService } from 'src/app/services/washerauth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unassigned-orders',
  templateUrl: './unassigned-orders.component.html',
  styleUrls: ['./unassigned-orders.component.css']
})
export class UnassignedOrdersComponent implements OnInit {
  p:number=1;
  orders:any=[];
  washerName:any;
  orderCount:any;
  flag:any;
  role:any;
  constructor(private washer:WasherService,private washerAuth:WasherauthService) { 
//     this.role=this.washerAuth.getRole();
//     this.washer.getUnassigned().subscribe((orders)=>{
//       this.orders=orders;
//       console.log(orders);
//       if(this.orders.length==0){
//         console.log(this.orders.length);
//      this.orderCount=this.orders.length;
//      this.flag=true;
// }
//  else{
   
//    this.orderCount=this.orders.length;
//    this.flag=false;
//    console.log(this.orderCount);
//  }
//     })
  }

  ngOnInit(): void {
    this.role=this.washerAuth.getRole();
    this.washer.getUnassigned().subscribe((orders)=>{
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
  assign(orderId:string,i:number){
    this.washerName=this.washerAuth.getWasherName();
    this.washer.assignHimself(orderId,this.washerName)
    // .pipe(catchError((err:HttpErrorResponse)=>{
    // Swal.fire({
    //     position : 'top-end',
    //     icon: 'error',
    //   title: 'Oops...',
    //   text: 'not assigned, try again',
    //   footer: '<a href="">Try Again</a>'
    //   })
    //  return "server error";
    //  }))
    .subscribe({
      next:(order)=>{console.log(order);
      Swal.fire({
        position : 'top-end',
          icon:'success',
          title:'Assigned successfully',
        showConfirmButton:false,
        timer:2000,
        })
        this.orders.splice(i,1);
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
      text: 'not assigned, try again',
      })
  }
});}
done(orderId:string,i:number){
  Swal.fire({
      title: 'Assign to order?',
      text: "You will be assigned to the order",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Assign'
    }).then((result) => {
      if (result.isConfirmed) {
        this.assign(orderId,i);
      }
    })
  
  }
}
