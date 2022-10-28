import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-assign-washer',
  templateUrl: './assign-washer.component.html',
  styleUrls: ['./assign-washer.component.css']
})

export class AssignWasherComponent implements OnInit {
  washers:any=[];
  fullname:any;
  id:any;
  
  name:string="";
  constructor(private admin:AdminService, private router:ActivatedRoute) {
   
  }
 
  ngOnInit(): void {
    this.admin.getWashers().subscribe((washers)=>{
      this.washers=washers;
      console.log(this.washers);
    })
    }
    search(){
      if(this.fullname==""){
        this.ngOnInit();
      }
      else{
        this.washers=this.washers.filter((res:any)=>{
          return res.fullname.toLocaleLowerCase().match(this.fullname.toLocaleLowerCase());
        })
      }
       }
       order:any;
       assign(washerName:string){
        this.id = (this.router.snapshot.paramMap.get('id') as string);
         console.log(this.id);
         this.admin.assignWasher(this.id,washerName)
         .pipe(catchError((err:HttpErrorResponse)=>{
          console.log("hghuh");
          console.log(err.status);
          Swal.fire({
           icon: 'error',
          title: 'Oops...',
          text: 'washer already assigned/ server error! Try again',
         
          })
         return "server error";
           }))
      .subscribe(order=>{
      console.log(order); 
     })
          }

}
