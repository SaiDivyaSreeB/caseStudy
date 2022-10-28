import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { CustomerauthGuardService } from 'src/app/services/customerauth-guard.service';
import { CustomerauthService } from 'src/app/services/customerauth.service';

@Component({
  selector: 'app-view-washpacks',
  templateUrl: './view-washpacks.component.html',
  styleUrls: ['./view-washpacks.component.css']
})
export class ViewWashpacksComponent implements OnInit {
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
this.role=this.customerAuth.getRole();
    this.customer.getPacks().subscribe((washpacks)=>{
      this.Washpacks=washpacks;
      console.log(this.Washpacks);
    })
  }

  ngOnInit(): void {
  }
 placeOrder(washpackId:String){
  this.router.navigate(['customer/placeOrder',washpackId]);
 }
 showmoreless(id:any){
 this. washpack.showMore=!(this.washpack.showMore);
 }

}
