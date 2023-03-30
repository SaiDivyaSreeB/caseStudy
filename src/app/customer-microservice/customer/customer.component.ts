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
    image:""
   }
  editProfileForm = new FormGroup({
    Fullname : new FormControl('',Validators.required),
  })
  constructor(private customerAuth:CustomerauthService,private customer:CustomerService) { 

  }

  ngOnInit(): void {
    this.customerEmail=this.customerAuth.getCustomerEmail();
    console.log(this.customerEmail);
    this.customerName=this.customerAuth.getCustomerName();
    console.log(this.customerName);
    this.user.fullname=this.customerName;
    this.user.image=String(this.customerAuth.getProfilePic());
  }
 
logout(){
 
    this.customerAuth.logout();
  }

  editProfile(){
    this.customerId=this.customerAuth.getCustomerId();
    console.log(this.fullname);
    
    this.customer.updateProfile(this.customerId,this.user).subscribe((response)=>{
      console.log(response);
      this.customerAuth.updateProfile(this.user.fullname,this.user.image);
      this.customerAuth.updateName(this.user.fullname);
      this.customerName=this.user.fullname;
    });
  }
  onselectFile(e:any,type:String){
    if(e.target.files){
      console.log(e.target.files);
      var reader = new FileReader();
      //console.log(e.target.files[0]);
      reader.onload=(event:any)=>{
    this.user.image=event.target.result;
    //console.log(this.user.image);
       }
       reader.readAsDataURL(e.target.files.item(0));
    }
    }
    deletePic(){
      sessionStorage.removeItem('picture');
      this.user.image="";
      this.editProfile();
    }
}
