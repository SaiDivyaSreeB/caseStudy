import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable ,from} from 'rxjs';
import {throwError} from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AdminauthService } from 'src/app/services/adminauth.service';

import { WashpacksComponent } from './washpacks.component';

fdescribe('WashpacksComponent', () => {
  let component!: WashpacksComponent;
  //let fixture: ComponentFixture<WashpacksComponent>;
  let service! : AdminService;
  let adminAuth: AdminauthService;
  let http: HttpClient;
  beforeEach(()=>{
    service= new AdminService(http);
     component=new WashpacksComponent(service,adminAuth);
     
  })
  const washpacks:any=[
    {
     
        id:"1",
       name:'p1',
       cost:100,
       description:"wash.."
     
    },
    {
     
      id:"2",
     name:'p2',
     cost:200,
     description:"wash2.."
   
  }
  ];
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ WashpacksComponent ]
  //   })
  //   .compileComponents();
  // });

 // beforeEach(() => {
    // fixture = TestBed.createComponent(WashpacksComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
 // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  fit('should set the washpacks property with items',()=>{

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
     spyOn(service,'getWashPacks').and.callFake(()=>{
      return from([washpacks]);  
     })
     component.ngOnInit();
    component.deleteWashpack("a",0)
    // expect(component.msg).toEqual(washpacks);
   expect(component.msg.deleted).toEqual(true);
    expect(component.washpacks).toEqual([

      {
       
        id:"2",
       name:'p2',
       cost:200,
       description:"wash2.."
     
    }
    ])
  })
  fit('should return server error when server returns an error when deleting washpack',()=>{
    spyOn(service,'deleteWashpack').withArgs('a').and.returnValue(throwError(()=> new HttpErrorResponse({error:{code:'error code', message:'some message'},status:500,statusText:'server error'})));
    component.deleteWashpack('a',0);
    expect(component.deleteWashpack('a',0)).toEqual()
    expect(component.error).toEqual("server error");
    })
  //})
  fit('washpack should be added',()=>{
    // const washpacks:any=[
    //   {
       
    //       id:"1",
    //      name:'p1',
    //      cost:100,
    //      description:"wash.."
       
    //   },
    //   {
       
    //     id:"2",
    //    name:'p2',
    //    cost:200,
    //    description:"wash2.."
     
    // },
    // {
    //   id:"3",
    //   name:'p3',
    //   cost:300,
    //   description:"wash3.."
    // }
    // ]
    //const pack={
      // id:"c",
    //   name:"p3",
    //   cost:300,
    //   description:"wash3.."
    // };
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
});
