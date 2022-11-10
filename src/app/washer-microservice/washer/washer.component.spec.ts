import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WasherService } from 'src/app/services/washer.service';
import { WasherauthService } from 'src/app/services/washerauth.service';
import { WasherComponent } from './washer.component';
import {of,from} from 'rxjs';
describe('WasherComponent', () => {
  let component: WasherComponent;
  let authService :jasmine.SpyObj<WasherauthService>;
  let service: WasherService;
  let http:HttpClient;
  beforeEach(()=>{
    service= new WasherService(http);
    authService= jasmine.createSpyObj('WasherauthService',['getWasherName','getWasherEmail','logout']);
    component=new WasherComponent(authService,service);
  })
  fit('ngOnInit',()=>{
    authService.getWasherEmail.and.returnValue('abc@gmail.com');
    authService.getWasherName.and.returnValue('abc');
    component.ngOnInit();
    expect(component.washerEmail).toBe('abc@gmail.com');
    expect(component.washerName).toBe('abc');
  })
fit('logout',()=>{
  component.logout();
  expect(authService.logout).toHaveBeenCalled();
})
});
