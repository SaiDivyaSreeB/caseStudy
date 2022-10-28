import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CustomerauthService {
  customerName:string='';
  message:any='';
  customer:any='';
  constructor(private http:HttpClient, private router:Router) { }
  authenticate(mail:string,password:string){
    console.log("hi");
    return this.http.post("http://localhost:8093/authUser/login",{email:mail,password:password})
    .pipe((catchError((err:HttpErrorResponse)=>{Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Wrong Credentials!',
      footer: '<a href="">Try Again</a>'
    })
    this.router.navigate(['customer/login']);
    return throwError(()=>err)})))
  
    .subscribe(
        (userData:any)=>{
        this.customer=userData;
        sessionStorage.setItem('email',mail);
        let token = "Bearer "+userData.token;
        sessionStorage.setItem('token',token);
        sessionStorage.setItem('id',userData.id);
        sessionStorage.setItem('fullname',userData.fullname);
        sessionStorage.setItem('roles',userData.roles);
        sessionStorage.setItem('role',userData.roles[0].role);
        this.router.navigate(['/customer/viewWashpacks']);
})}
register(user:any){
  return this.http.post("http://localhost:8093/authUser/register",user,{responseType:'text' as 'json'});
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
getCustomerEmail(){
  return sessionStorage.getItem("email");
}
getUser(name:String){
  this.customer.fullname=name;
  console.log(this.customer.fullname);
  return this.customer;
  
}
getCustomerName(){
  return sessionStorage.getItem('fullname');
}
getCustomerId(){
  return sessionStorage.getItem('id');
}
updateName(name:string){
  return sessionStorage.setItem('fullname',name);
}
getRole(){
  return sessionStorage.getItem('role');
 }
}




  
  
  
 