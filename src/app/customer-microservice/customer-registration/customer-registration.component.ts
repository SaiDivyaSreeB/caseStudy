import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { CustomerauthService } from 'src/app/services/customerauth.service';
import Swal from 'sweetalert2';
import { customerDetails } from './customerRegistrationInfo';
@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  customerDetails:customerDetails={
    email:"",
    password:"",
    fullname:"",
     }
  message:any;
  status:any;
  RegistrationForm = new FormGroup({
    mail:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    userPassword:new FormControl('',[Validators.required,Validators.pattern('((?=.*\\d)(?=.*[a-z]).{8,30})')]),
    userFullname:new FormControl('',Validators.required)
  })
  constructor(private customerAuth:CustomerauthService, private router:Router) { }

  ngOnInit(): void {
  }
  registerNow(){
    let res = this.customerAuth.register(this.customerDetails)
    .subscribe({
      next:(data:any)=>{
      this.message=data;
     console.log(this.message);
     console.log(data);
     if(data=="oops"){
       console.log("oops");
       Swal.fire({
      icon: 'error',
     title: 'Oops...',
     text: 'User already exists!, Try with different mail',
   
     })
     this.router.navigate(['/customerRegister']);
     }
   else{
   Swal.fire({
     position : 'top-end',
       icon:'success',
       title:'Saved. Login to continue',
     showConfirmButton:false,
     timer: 2000
     })
     this.router.navigate(['/customerLogin']);
     console.log(this.message);
   
   }
 },
 error:()=>{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Server Error, try again',
   })
     this.router.navigate(['/customerRegister']);
 }
 
 })

}

}
