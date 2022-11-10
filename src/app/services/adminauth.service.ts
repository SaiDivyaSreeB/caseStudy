import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminauthService {
 
  message:any='';

  constructor(private http:HttpClient, private router:Router) { }
  authenticate(mail:string,password:string){
    console.log("hi");
    return this.http.post("http://localhost:8093/authAdmin/login",{email:mail,password:password})
    // .pipe((catchError((err:HttpErrorResponse)=>
    // {
    //   Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'Wrong Credentials! or server error, Try Again',
    // })
    // this.router.navigate(['/adminLogin']);
    // return throwError(()=>err)})))
  
    .subscribe({
      next:(userData:any)=>{
        console.log(userData);
        sessionStorage.setItem('email',mail);
        let token = "Bearer "+userData.token;
        sessionStorage.setItem('token',token);
        sessionStorage.setItem('id',userData.id);
        sessionStorage.setItem('fullname',userData.fullname);
        sessionStorage.setItem('roles',userData.roles);
        sessionStorage.setItem('picture',userData.image);
        sessionStorage.setItem('role',userData.roles[0].role);
        sessionStorage.setItem('user',userData);
        this.router.navigate(['/admin/washpacks'])
      },
    error:()=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong Credentials! or server error, Try Again',
      })
      this.router.navigate(['/adminLogin']);
    }})
  }
  register(user:any){
    return this.http.post("http://localhost:8093/authAdmin/register",user,{responseType:'text' as 'json'});
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
 getAdminName(){
  return sessionStorage.getItem('fullname');
 }

 updateProfile(name:string,picture:any){
  // return sessionStorage.setItem('fullname',name);
  sessionStorage.setItem('fullname',name);
  sessionStorage.setItem('picture',picture);
}
getId(){
  return sessionStorage.getItem('id');
}
 getAdminEmail(){
  return sessionStorage.getItem('email');
 }
 getToken(){
  return sessionStorage.getItem('token');
 }
 getRole(){
  return sessionStorage.getItem('role');
 }
 getProfilePic(){
  return sessionStorage.getItem('picture');
 }
}
