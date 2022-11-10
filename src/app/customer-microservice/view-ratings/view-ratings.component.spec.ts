import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminService } from 'src/app/services/admin.service';
import { AdminauthService } from 'src/app/services/adminauth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerauthService } from 'src/app/services/customerauth.service';
import {of} from 'rxjs';
import { ViewRatingsComponent } from './view-ratings.component';

describe('ViewRatingsComponent', () => {
  let component: ViewRatingsComponent;
  let authService:jasmine.SpyObj<CustomerauthService>;
  let service:jasmine.SpyObj<CustomerService>
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
    service=jasmine.createSpyObj('CustomerService',['viewRatings']);
    authService=jasmine.createSpyObj('CustomerauthService',['getRole']);
    component=new ViewRatingsComponent(service,authService);
  })
  fit('ngOninit',()=>{
    service.viewRatings.and.returnValue(of(ratings));
    authService.getRole.and.returnValue("USER");
    component.ngOnInit();
    expect(component.role).toBe("USER");
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
