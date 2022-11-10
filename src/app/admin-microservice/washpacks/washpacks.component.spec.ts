import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable ,from} from 'rxjs';
import {throwError} from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AdminauthService } from 'src/app/services/adminauth.service';
import {of} from 'rxjs';
import { WashpacksComponent } from './washpacks.component';

fdescribe('WashpacksComponent', () => {
  let component!: WashpacksComponent;
  //let fixture: ComponentFixture<WashpacksComponent>;
  let service! : AdminService;
  let adminAuth!:jasmine.SpyObj<AdminauthService> ;
  let http: HttpClient;
  beforeEach(()=>{
    adminAuth=jasmine.createSpyObj('AdminauthService',['getRole']);
    service= new AdminService(http);
     component=new WashpacksComponent(service,adminAuth);
     
  })
  const washpacks:any=[
    {
     
        id:"1",
       name:'p1',
       cost:100,
       description:"wash..",
      image:""
    },
    {
     id:"2",
     name:'p2',
     cost:200,
     description:"wash2..",
     image:""
  }
  ];
  fit('should set the washpacks property with items',()=>{
    adminAuth.getRole.and.returnValue('ADMIN');
  spyOn(service,'getWashPacks').and.callFake(()=>{
    return from([washpacks]);

  })
  component.ngOnInit();
  expect(component.washpacks).toEqual(washpacks);}
  )
  fit('washpack should be deleted',()=>{
    spyOn(service, 'deleteWashpack').withArgs("a").and.callFake(()=>{
      return from([{deleted:true}]);
    })
     component.washpacks=washpacks;
    component.deleteWashpack("a",0)
   expect(component.msg.deleted).toEqual(true);
    expect(component.washpacks).toEqual([
      {
       id:"2",
       name:'p2',
       cost:200,
       description:"wash2..",
      image:""
    }
    ])
  })
  fit('should return server error ',()=>{
    spyOn(service,'deleteWashpack').and.returnValue(throwError(()=> new HttpErrorResponse({status:500,statusText:'server error'})));
    spyOn(service,'addWashpack').and.returnValue(throwError(()=> new HttpErrorResponse({status:500,statusText:'server error'})));
    spyOn(service,'editWashpack').and.returnValue(throwError(()=> new HttpErrorResponse({status:500,statusText:'server error'})));
    component.deleteWashpack('a',0);
    component.add();
    component.update("2");
    expect(service.deleteWashpack).toHaveBeenCalledTimes(1);
    expect(service.addWashpack).toHaveBeenCalledTimes(1);
    expect(service.editWashpack).toHaveBeenCalledTimes(1);
    })
  //})
  fit('washpack should be added',()=>{
   const pack={
      name:"",
      cost:0,
      description:"",
      image:""
    }
    spyOn(service,'addWashpack').withArgs(pack).and.callFake(()=>{
      return from([pack]);
    })
    component.add();
    expect(component.washpack).toEqual(pack);
  })
  fit('should return updated washpack when updateWashpack is called',()=>{
    const pack={
      id:"2",
      name:'p2',
      cost:250,
      description:"wash2..",
      image:""
   }
    spyOn(service,'editWashpack').and.returnValue(of(pack));
    component.update("2");
    expect(service.editWashpack).toHaveBeenCalledTimes(1);
  })
});
