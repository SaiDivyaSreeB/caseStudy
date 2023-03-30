import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerService } from 'src/app/services/customer.service';
import { WasherService } from 'src/app/services/washer.service';
import { WasherauthService } from 'src/app/services/washerauth.service';
import{of} from 'rxjs';
import { RatingsComponent } from './ratings.component';
import { Router } from '@angular/router';

describe('RatingsComponent', () => {
  let component:RatingsComponent;
  let authService:jasmine.SpyObj<WasherauthService>;
  let service:jasmine.SpyObj<WasherService>;
  let router:Router;
  const ratings=[{
    id:"a",
    washerName:"Ramya",
    comments:"good",
    rating:"4"
  },
  {
    id:"b",
    washerName:"Ram",
    comments:"good",
    rating:"4"
  }]
  beforeEach(()=>{
    service=jasmine.createSpyObj('WasherService',['viewRatings']);
    authService=jasmine.createSpyObj('WasherauthService',['getRole']);
    component=new RatingsComponent(service,authService,router);
  })
  fit('ngOninit',()=>{
    service.viewRatings.and.returnValue(of(ratings));
    authService.getRole.and.returnValue("WASHER");
    component.ngOnInit();
    expect(component.role).toBe("WASHER");
    expect(component.ratings).toEqual(ratings);
  })

  fit('should return nothing when is search function called',()=>{
    component.washerName="";
    spyOn(component,'ngOnInit');
    component.Search();
    expect(component.ngOnInit).toHaveBeenCalledTimes(1);
  })
  fit('should return nothing when search function is called',()=>{
    component.washerName="Ramya";
    component.ratings=ratings;
    component.Search();
    expect(component.ratings.length).toBe(1);
  })
});
