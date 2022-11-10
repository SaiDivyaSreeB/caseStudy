import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchAll } from 'rxjs';
import { WasherauthService } from 'src/app/services/washerauth.service';
import { threadId } from 'worker_threads';
import { washerDetails } from './washerRegistrationInfo';
import {catchError}from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-washer-registration',
  templateUrl: './washer-registration.component.html',
  styleUrls: ['./washer-registration.component.css']
})
export class WasherRegistrationComponent implements OnInit {

  constructor(private washer:WasherauthService,private router: Router) { }
  washerDetails:washerDetails={
    email:"",
    password:"",
    fullname:"",
    }
  message:any;
  status:any;
  RegistrationForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password:new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern('((?=.*\\d)(?=.*[a-z]).{8,30})')]),
    fullname:new FormControl('',Validators.required)
  })
 registerNow(){
      let res = this.washer.register(this.washerDetails)
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
      text: 'User already exists!, Try with different mail, Try Again',
      })
      this.router.navigate(['/washerRegister']);
      }
    else{
    Swal.fire({
      position : 'top-end',
        icon:'success',
        title:'Saved. Login to continue',
      showConfirmButton:false,
      timer: 2000
      })
      console.log("login");
      this.router.navigate(['/washerLogin']);
      console.log(this.message);
    }
  },
error:()=>{
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Server Error, try again',
  })
  this.router.navigate(['/washerRegister']);
}})
  }
  ngOnInit(): void {
  }

}
