import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { CustomerauthGuardService } from 'src/app/services/customerauth-guard.service';
import { CustomerauthService } from 'src/app/services/customerauth.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-washpacks',
  templateUrl: './view-washpacks.component.html',
  styleUrls: ['./view-washpacks.component.css']
})
export class ViewWashpacksComponent implements OnInit {
  error:boolean=false;
  errorType:any;
Washpacks:any=[];
washpack={
  name:"",
  image:"",
  cost:"",
  description:"",
 
 showMore : false
}
wordLimit:number=15;
 role:any;
  constructor(private customer:CustomerService, private router:Router,private customerAuth:CustomerauthService) { 

  }

  ngOnInit(): void {
    this.role=this.customerAuth.getRole();
    this.customer.getPacks()
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
    .subscribe((washpacks)=>{
      this.Washpacks=washpacks;
      console.log(this.Washpacks);
    })
  }
 placeOrder(washpackId:String){
  this.router.navigate(['customer/placeOrder',washpackId]);
 }
 showmoreless(id:any){
 this. washpack.showMore=!(this.washpack.showMore);
 }

}
