import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from '@angular/forms'
import { WasherService } from 'src/app/services/washer.service';
import { WasherauthService } from 'src/app/services/washerauth.service';

@Component({
  selector: 'app-washer',
  templateUrl: './washer.component.html',
  styleUrls: ['./washer.component.css']
})
export class WasherComponent implements OnInit {
  washerName:any;
  washerEmail:any;
  fullname:string='';
  washerData={
    fullname:"",
    image:""
  }
  washerId:any='';
  LoginForm = new FormGroup({
    fullname : new FormControl('',Validators.required),
  })
  constructor(private washerAuth:WasherauthService,private washer:WasherService) {}
  ngOnInit(): void {
    this.washerName=this.washerAuth.getWasherName();
    this.washerEmail=this.washerAuth.getWasherEmail();
    this.washerData.fullname=String(this.washerAuth.getWasherName());
    this.washerData.image=String(this.washerAuth.getProfilePic());
  }
  logout()
  {
    this.washerAuth.logout();
  }
  edit(){
    this.washerId=this.washerAuth.getWasherId();
    console.log(this.washerId);
   console.log(this.washerData);
    this.washer.updateProfile(this.washerId,this.washerData)   
   .subscribe((response)=>{
      console.log(response);
      this.washerAuth.updateProfilePic(this.washerData.image);
    });
    this.washer.updatePicRating(this.washerData).subscribe(
      (ratings)=>{
        console.log(ratings);
      }
    )
   }
   onselectFile(e:any,type:String){
    if(e.target.files){
      var reader = new FileReader();
      console.log(e.target.files[0]);
      reader.onload=(event:any)=>{
    this.washerData.image=event.target.result;
    console.log(this.washerData.image);
       }
      reader.readAsDataURL(e.target.files.item(0));
    }
    }
    deletePic(){
      sessionStorage.removeItem('picture');
      this.washerData.image="";
      this.edit();
    }
}
