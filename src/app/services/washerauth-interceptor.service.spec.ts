import { HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable,of } from 'rxjs';
import { WasherauthInterceptorService } from './washerauth-interceptor.service';

describe('WasherauthInterceptorService', () => {
  let service: WasherauthInterceptorService;
  let req: jasmine.SpyObj<HttpRequest<any>>;
  let next: HttpHandler;
  let Session:any;
  beforeEach(()=>{
    Session=jasmine.createSpyObj('sessionStorage',['getItem'])
    //req=jasmine.createSpyObj(HttpRequest<any>,['clone']);
    service = new WasherauthInterceptorService();
  })
  xit('',()=>{
    const next: any = {
      handle: () => {
        return Observable.create((subscriber:any) => {
          subscriber.complete();
        });
      }
    };
    
    const requestMock = new HttpRequest('GET', '/test');
   
   Session.getItem.and.returnValue('abc@gmail.com');
   //Session.getItem.and.returnValue('eet35y');
    service.intercept(requestMock, next).subscribe({
      next:() => {
       

       
      expect(requestMock.headers).toBeDefined;
      expect(service.x).toBe(0);
      expect(service.flag).toBe(1);
      
    },
    error:()=>{}
  });
    
  })
});
