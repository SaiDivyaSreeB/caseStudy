import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-assign-washer',
  templateUrl: './assign-washer.component.html',
  styleUrls: ['./assign-washer.component.css']
})

export class AssignWasherComponent implements OnInit {
  error:boolean=false;
  errorType:any;
  washers:any=[];
  fullname:any;
  id:any;
  
  name:string="";
  constructor(private admin:AdminService, private router:ActivatedRoute, private route:Router) {
   
  }
 
  ngOnInit(): void {
    this.admin.getWashers()
    .pipe((catchError((err:HttpErrorResponse)=>{
      this.error=true;
      if(err.status==500 || err.status==503){
        this.errorType="server error";
        console.log(this.errorType)
      }
      if(err.status==403){
        console.log("session expired");
        sessionStorage.clear();
       this.route.navigate(['/adminLogin']);
      }
      return throwError(()=>err)})))
    .subscribe((washers)=>{
      this.washers=washers;
      console.log(this.washers);
    })
    }
    search(){
      if(this.fullname==""){
        this.ngOnInit();
      }
      else{
        this.washers=this.washers.filter((res:any)=>{
          return res.fullname.toLocaleLowerCase().match(this.fullname.toLocaleLowerCase());
        })
      }
    }
       order:any;
       assign(washerName:string){
        this.id = (this.router.snapshot.paramMap.get('id') as string);
         console.log(this.id);
         this.admin.assignWasher(this.id,washerName)
         .pipe(catchError((err:HttpErrorResponse)=>{
          console.log("hghuh");
          console.log(err.status);
          Swal.fire({
           icon: 'error',
          title: 'Oops...',
          text: 'washer already assigned/ server error! Try again',
         })
         return "server error";}))
        .subscribe(order=>{console.log(order);})
        }

}
