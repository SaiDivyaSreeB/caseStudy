import { Component, OnInit } from '@angular/core';
import { WasherService } from 'src/app/services/washer.service';
import { WasherauthService } from 'src/app/services/washerauth.service';
import { RatingInfo } from './RatingInfo';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  p:number=1;
  ratings:any=[]
  rate=3;
  washerName:any;
  rating:RatingInfo={
    washerName:"",
    comments:"",
    rating:0,
  }
  i:any =1;
  constructor(private washer:WasherService,private washerAuth:WasherauthService) {
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
    this.washer.viewRatings().subscribe((Ratings)=>{
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
