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
    .pipe((catchError((err:HttpErrorResponse)=>{Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Wrong Credentials! or server error',
      footer: '<a href="">Try Again</a>'
    })
    this.router.navigate(['admin/login']);
    return throwError(()=>err)})))
  
    .subscribe((userData:any)=>{
        console.log(userData);
        sessionStorage.setItem('email',mail);
        let token = "Bearer "+userData.token;
        sessionStorage.setItem('token',token);
        sessionStorage.setItem('id',userData.id);
        sessionStorage.setItem('fullname',userData.fullname);
        sessionStorage.setItem('roles',userData.roles);
        sessionStorage.setItem('role',userData.roles[0].role);
        sessionStorage.setItem('user',userData);
        this.router.navigate(['/admin/washpacks'])
      })
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
  }
 getAdminName(){
  return sessionStorage.getItem('fullname');
 }

 updateName(name:string){
  return sessionStorage.setItem('fullname',name);
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
}
