import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminauthService } from 'src/app/services/adminauth.service';
@Component({
  selector: 'app-washpacks',
  templateUrl: './washpacks.component.html',
  styleUrls: ['./washpacks.component.css']
})
export class WashpacksComponent implements OnInit {
  washpacks:any=[];
  washpack:any;
  url="./assets/Images/logo.jpg"
  msg:any=[];
  Washpack={
     id:"",
    name:"",
    cost:0,
    description:"",
    image:"",
  }
 
  pack={
   
   name:"",
   cost:0,
   description:"",
   image:"",
 }
 errorMessage:any;
 wordLimit:number=0;
 showMore=false;
  updateForm = new FormGroup({
   packName:new FormControl('',Validators.required),
    packCost:new FormControl('',Validators.required),
    packDescription: new FormControl('',Validators.required)
  })
  AddForm = new FormGroup({
   packName:new FormControl('',Validators.required),
    packCost:new FormControl('',Validators.required),
    packDescription: new FormControl('',Validators.required),
    // image:new FormControl('',Validators.required)
  })
  constructor(private admin:AdminService,private adminAuth:AdminauthService) {
    
    // this.admin.getWashPacks().subscribe((washpacks)=>{
    //   this.washpacks=washpacks;
     
    // })
  }
  role:any;
  ngOnInit(): void {
    this.role=this.adminAuth.getRole();
    this.admin.getWashPacks().subscribe((washpacks)=>{
      this.washpacks=washpacks;
  })
  }
error:any;
  deleteWashpack(id:String,i:number){//,i:number

     /* let res =*/ this.admin.deleteWashpack(id)
    //  .pipe(catchError((err:HttpErrorResponse)=>{
    
      
    //     Swal.fire({
          
    //       icon: 'error',
    //     title: 'Oops...',
    //     text: 'Server Error',
    //     footer: '<a href="">Try Again</a>'
    //     })
    //     this.error="server error";
    //    return "server error";
    // }))
    .subscribe({
      next:(msg:any)=>{
      console.log(msg);
      console.log(msg.deleted);
      this.msg=msg;
       if(msg.deleted ==true){
        
        this.washpacks.splice(i,1);
    
        Swal.fire({
          position : 'top-end',
            icon:'success',
            title:'Deleted',
          showConfirmButton:false,
          timer: 1000,
          })
      }
      
    },
    error:()=>{
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Server Error',
      footer: '<a href="">Try Again</a>'
      })
    }
  })
}
  update(id:string){
    this.admin.editWashpack(id,this.Washpack)
    //.pipe(catchError((err:HttpErrorResponse)=>{
    // Swal.fire({
    //     position : 'top-end',
    //     icon: 'error',
    //   title: 'Oops...',
    //   text: 'washpack not found or server error',
    //   footer: '<a href="">Try Again</a>'
    //   })
    //  return "server error";
    //  }))
  .subscribe({
    next:(washpack)=>{
      console.log(washpack);
      Swal.fire({
        position : 'top-end',
          icon:'success',
          title:'Updated',
        showConfirmButton:false,
        timer: 1000,
        })
    },
  error:()=>{
    Swal.fire({
      position : 'top-end',
      icon: 'error',
    title: 'Oops...',
    text: 'washpack not found or server error,try again',
  
    })
  }})
  }
  edit(washpack:any){
    this.Washpack=washpack;
    console.log(this.Washpack.cost);
      let a = document.querySelector('.popup') as HTMLElement
      a.style.display='flex';
   }
   close(){
    let b = document.querySelector('.popup') as HTMLElement
    b.style.display='none';
   }
   errorOcuured:any;
   add(){
    console.log(this.pack);
    this.admin.addWashpack(this.pack)
  //   .pipe(catchError((err:HttpErrorResponse)=>{
  //     this.errorOcuured=err;
  //     Swal.fire({
  //       position : 'top-end',
  //       icon: 'error',
  //     title: 'Oops...',
  //     text: 'Fill all details correctly',
  //     footer: '<a href="">Try Again</a>'
  //     })
  //    return "server error";
  // }))
  .subscribe({
    next:(response)=>{
    if(!this.errorOcuured){
      console.log(response);
      this.washpack=response;
      console.log(this.washpack.cost);
      Swal.fire({
        position : 'top-end',
          icon:'success',
          title:'Added',
        showConfirmButton:false,
        timer: 2000,
        })
      }
    },
    error:()=>{
      Swal.fire({
              position : 'top-end',
              icon: 'error',
            title: 'Oops...',
            text: 'Fill all details correctly',
            footer: '<a href="">Try Again</a>'
            })
    }
 // error:(err)=>{console.log(err.message)}})//this.errorMessage=err.message;console.log("hi");console.log(this.errorMessage);console.log("hello")
  })  
   }
          
  delete(id:String,i:number){
    
    Swal.fire({
      title: 'Delete washpack?',
      text: "washpack will be deleted",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteWashpack(id,i);
      }
    })
  
}
onselectFile(e:any,type:String){
if(e.target.files){
  var reader = new FileReader();
 
  console.log(e.target.files[0]);
  reader.onload=(event:any)=>{
   
    if(type=="AddForm")
    {
       this.url=event.target.result;
    this.pack.image=event.target.result;
    }
    else
    {
    this.Washpack.image=event.target.result;
    
    }
    console.log(this.url);
  }
  reader.readAsDataURL(e.target.files.item(0));
}
}

}
