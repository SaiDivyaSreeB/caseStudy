import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { WasherService } from 'src/app/services/washer.service';
import { WasherauthService } from 'src/app/services/washerauth.service';
import { RatingInfo } from './RatingInfo';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  error:boolean=false;
  errorType:any;
  p:number=1;
  ratings:any=[]
  rate=3;
  washerName:any;
  rating:RatingInfo={
    image:"",
    washerName:"",
    comments:"",
    rating:0,
  }
  i:any =1;
  constructor(private washer:WasherService,private washerAuth:WasherauthService,private router:Router) {
  }
   fu(){
    this.i=this.i+1;
    console.log(this.i);
   }
   counter(i:number){
    return new Array(i);
   }
role:any
  ngOnInit(): void {
    this.role=this.washerAuth.getRole();
    this.washer.viewRatings()
    .pipe((catchError((err:HttpErrorResponse)=>{
      this.error=true;
      if(err.status==500 || err.status==503){
        this.errorType="server error";
        console.log(this.errorType)
      }
      if(err.status==403){
        this.errorType="unauthorised error"
        console.log("session expired");
        sessionStorage.clear();
       this.router.navigate(['/washerLogin']);
      }
      return throwError(()=>err)})))
    .subscribe((Ratings)=>{
    this.ratings=Ratings
    console.log(this.ratings);
      })
  }
  Search(){
    if(this.washerName==""){
      this.ngOnInit();
    }
    else{
      this.ratings=this.ratings.filter((res:RatingInfo)=>{
      return res.washerName.toLocaleLowerCase().match(this.washerName.toLocaleLowerCase());
      });
    }
  }

}
