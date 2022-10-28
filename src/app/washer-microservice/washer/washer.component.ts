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
  washerData:Object='';
  washerId:any='';
  LoginForm = new FormGroup({
    fullname : new FormControl('',Validators.required),
  })

  constructor(private washerAuth:WasherauthService,private washer:WasherService) {
    this.washerName=this.washerAuth.getWasherName();
    this.washerEmail=this.washerAuth.getWasherEmail();
   }

  ngOnInit(): void {
  }
  
 
  logout()
  {
    this.washerAuth.logout();
  }
  

  edit(){
    this.washerId=this.washerAuth.getWasherId();
    console.log(this.washerId);
   this.washerData=this.washerAuth.getUser(this.fullname);
   console.log(this.washerData);
    this.washer.updateProfile(this.washerId,this.washerData);
   

  }

}
