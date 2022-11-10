import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerauthService } from 'src/app/services/customerauth.service';
import { RatingInfo } from './RatingInfo';

@Component({
  selector: 'app-view-ratings',
  templateUrl: './view-ratings.component.html',
  styleUrls: ['./view-ratings.component.css']
})
export class ViewRatingsComponent implements OnInit {
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
  constructor(private customer:CustomerService,private customerAuth:CustomerauthService) {
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
    this.role=this.customerAuth.getRole();
    this.customer.viewRatings().subscribe((Ratings)=>{
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
