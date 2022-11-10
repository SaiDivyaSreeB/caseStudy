import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { AdminauthService } from 'src/app/services/adminauth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  fullname:any;
  adminId:any;
  adminName:any;
  adminEmail:any;
  profilePic:any;
   //user:any;
   user={
    fullname:"",
    image:""
   }
  editProfileForm = new FormGroup({
    Fullname : new FormControl('',Validators.required),
  })
  role:any;
  constructor(private adminAuth:AdminauthService, private admin:AdminService) {
    
   }
   
  ngOnInit(): void {
    this.role=this.adminAuth.getRole();
    this.adminName=this.adminAuth.getAdminName();
    this.adminEmail=this.adminAuth.getAdminEmail();
    this.user.fullname=this.adminName;
    this.user.image=String(this.adminAuth.getProfilePic());
    // let a=document.getElementById('image') as HTMLElement
    // a.style.backgroundImage='url('+this.user.image+')';
  }
  editProfile(){
    this.adminId=this.adminAuth.getId();
    console.log(this.fullname);
    
    this.admin.updateProfile(this.adminId,this.user).subscribe((response)=>{
      console.log(response);
      this.adminAuth.updateProfile(this.user.fullname,this.user.image);
      this.adminName=this.user.fullname;
    });
  }
  logout(){
    this.adminAuth.logout();
  }
  onselectFile(e:any,type:String){
    if(e.target.files){
      var reader = new FileReader();
      console.log(e.target.files[0]);
      reader.onload=(event:any)=>{
    this.user.image=event.target.result;

    console.log(this.user.image);
     //console.log()
      //let a=document.getElementById('image') as HTMLElement
    // a.style.backgroundImage='url('+this.user.image+')';
       }
      reader.readAsDataURL(e.target.files.item(0));
    }
    }
    deletePic(){
      sessionStorage.removeItem('picture');
      this.user.image="";
      this.editProfile();
    }
 }
