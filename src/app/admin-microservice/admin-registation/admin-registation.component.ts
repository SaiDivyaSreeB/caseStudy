import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AdminauthService } from 'src/app/services/adminauth.service';
import Swal from 'sweetalert2';
import {admin, adminDetails} from './adminInfo'
@Component({
  selector: 'app-admin-registation',
  templateUrl: './admin-registation.component.html',
  styleUrls: ['./admin-registation.component.css']
})
export class AdminRegistationComponent implements OnInit {
  constructor(private admin:AdminauthService,private router: Router) { 

  }
  adminDetails:adminDetails={
    email:"",
    password:"",
    fullname:"",
     }
     //interface User{}
    //  user={
    // id:"",
    // email:"",
    // password:"",
    // token:"",
    // fullname:"",
    // enabled:false,
    // roles:[{id:"",role:"ADMIN"}]
    //  }
    user:any;
  registeredUser:any;
  message:any;
  status:any;
  RegistrationForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password:new FormControl('',[Validators.required,Validators.pattern('((?=.*\\d)(?=.*[a-z]).{8,30})')]),
    fullname:new FormControl('',Validators.required)
  })
  public registerNow(){
      let res = this.admin.register(this.adminDetails)
    //   .pipe(catchError((err:HttpErrorResponse)=>{
    //     console.log("firsterr");
    //     Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'Server Error, try again',
    //  })
    //    this.router.navigate(['/admin/register']);
    //     //return throwError("server Error")
    //     return "server Error"
    //   }
    //   ))
      .subscribe(
        {next:(data:any)=>{
        this.message=data;
        this.user=data;
        console.log(".............")
        console.log(this.user);
        console.log(this.user.enabled);
        console.log(this.user.email);
        console.log("................");
       console.log(this.message);
       console.log(data);
       if(data=="User exists already, try with a different email address"){
         console.log("oops");
         Swal.fire({
         icon: 'error',
       title: 'Oops...',
       text: 'User already exists! Try with different mail',
      
       })
       this.router.navigate(['/admin/register']);
       }
    else{
     Swal.fire({
       position : 'top-end',
         icon:'success',
         title:'Saved',
       showConfirmButton:false,
       timer: 2000
       })
       this.router.navigate(['/admin/register']);
     
       console.log(this.message);
       console.log(this.user);
       console.log(this.user.enabled)
       }
  //     if(this.message.enabled==true){
  //    Swal.fire({
  //      position : 'top-end',
  //        icon:'success',
  //        title:'Saved. Login to continue',
  //      showConfirmButton:false,
  //      timer: 1000
  //      })
  //      this.router.navigate(['/admin/login']);
  //      console.log(this.message);
  //      }
  },
  error:(err:HttpErrorResponse)=>{
     //   .pipe(catchError((err:HttpErrorResponse)=>{
    //     console.log("firsterr");
        Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Server Error, try again',
     })
       this.router.navigate(['/admin/register']);
    //     //return throwError("server Error")
    //     return "server Error"
    //   }
    //   ))
  }
})
   }
   role:any;
 ngOnInit(): void {
  this.role=this.admin.getRole();
  }

}
