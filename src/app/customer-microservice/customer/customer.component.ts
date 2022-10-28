import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerauthService } from 'src/app/services/customerauth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  // name:String="";
  fullname:any;
  customerId:any;
  customerEmail:any;
  customerName:any;
   //user:any;
   user={
    fullname:"",
   }
  editProfileForm = new FormGroup({
    Fullname : new FormControl('',Validators.required),
  })
  constructor(private customerAuth:CustomerauthService,private customer:CustomerService) { 
    this.customerEmail=this.customerAuth.getCustomerEmail();
    console.log(this.customerEmail);
    this.customerName=this.customerAuth.getCustomerName();
    console.log(this.customerName);
  }

  ngOnInit(): void {
   
  }
 
logout(){
 
    this.customerAuth.logout();
  }

  editProfile(){
    this.customerId=this.customerAuth.getCustomerId();
    console.log(this.fullname);
    
    this.customer.updateProfile(this.customerId,this.user).subscribe((response)=>{
      console.log(response);
      this.customerAuth.updateName(this.user.fullname);
      this.customerName=this.user.fullname;
    });
  }


}
