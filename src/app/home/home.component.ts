import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Washpacks:any=[];
  washpack={
    name:"",
    cost:"",
    description:""
  }
  ratings:any=[]
  rate=3;
  washerName:any;
  rating={          
    washerName:"",
    comments:"",
    rating:0,
  }
  constructor(private admin:AdminService,private customer:CustomerService) {
    this.admin.getWashPacks().subscribe((washpacks)=>{
      this.Washpacks=washpacks;
      console.log(this.Washpacks);
    })
    this.customer.viewRatings().subscribe((Ratings)=>{
        console.log(Ratings);
         this.ratings=Ratings})
   
   }

  ngOnInit(): void {
   
  }
  counter(i:number){
    return new Array(i);
   }
 

}
