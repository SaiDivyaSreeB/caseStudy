import { HttpEvent, HttpRequest,HttpHandler, HttpInterceptor, HttpResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable,throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators'
// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class WasherauthInterceptorService implements HttpInterceptor{
flag:any;
x:any;
  constructor() { }
  intercept(req: HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    console.log("-----Interceptor-----");
    //debugger;
    if(sessionStorage.getItem('email')&&sessionStorage.getItem('token')){
      x:1;
      console.log('inside if interceptor');
      req=req.clone({
        setHeaders:{
          Authorization:sessionStorage.getItem('token')||''
         }
       })
       console.log('after setting header');
      //req= req.clone({headers:req.headers.set('Authorization',sessionStorage.getItem('token')||'')});
    }
    return next.handle(req).pipe(
      finalize(()=>{
        flag:1;
      })
    );
    // return next.handle(req).pipe(catchError(err=>{
    //   if(err.status===401){

    //   }
    //   else{
    //     const error = err.error.message||err.statusText;
    //     return throwError(error);
    //   }
    // }));
  }
  }

