import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError}from 'rxjs/operators';
import {throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class WasherauthService {
  washerName:string='';
  message:any='';
  washer:any='';
  constructor(private http:HttpClient, private router:Router) { }
  authenticate(mail:string,password:string){
    console.log("hi");
    return this.http.post("http://localhost:8093/authWasher/login",{email:mail,password:password})
    // .pipe((catchError((err:HttpErrorResponse)=>{
    //   Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'Wrong Credentials! or server eeror, Try Again',
    // })
    // this.router.navigate(['/washerLogin']);
    // return throwError(()=>"server Error")})))
    .subscribe({
         next: (userData:any)=>{
          this.washer=userData;
          sessionStorage.setItem('email',mail);
          let token = "Bearer "+userData.token;
          sessionStorage.setItem('token',token);
          console.log(token);
          sessionStorage.setItem('id',userData.id);
          sessionStorage.setItem('fullname',userData.fullname);
          sessionStorage.setItem('roles',userData.roles);
          sessionStorage.setItem('role',userData.roles[0].role);
          sessionStorage.setItem('picture',userData.image);
          this.router.navigate(['/washer/myOrders']);
        },
        error:()=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Credentials! or server eeror, Try Again',
          })
          this.router.navigate(['/washerLogin']);
        }})
      }
  getWasherName(){
    return sessionStorage.getItem('fullname');
  }
  register(user:any){
    return this.http.post("http://localhost:8093/authWasher/register",user,{responseType:'text' as 'json'});
  }
  isLoggedIn(){
    let user = sessionStorage.getItem('email');
    let token = sessionStorage.getItem("token");
    if(token==undefined||token==null||token=='')
    {
        return false;
    }
    else{
      return true;
    }
  }
  logout(){
    sessionStorage.clear();
           sessionStorage.removeItem("token");
           sessionStorage.removeItem("email");
           sessionStorage.removeItem('id');
           sessionStorage.removeItem('fullname');
           sessionStorage.removeItem('roles');
           sessionStorage.removeItem('picture');
  }
  getWasherEmail(){
    return sessionStorage.getItem("email");
  }
  getUser(name:String){
    this.washer.fullname=name;
    console.log(this.washer.fullname);
    return this.washer;
    
  }
  getWasherId(){
    return sessionStorage.getItem('id');
  }
  getRole(){
    return sessionStorage.getItem('role');
  }
  updateProfilePic(picture:any){
    sessionStorage.setItem('picture',picture);
    // sessionStorage.setItem('fullname',name);
  }
   getProfilePic(){
    return sessionStorage.getItem('picture');
   }
}
