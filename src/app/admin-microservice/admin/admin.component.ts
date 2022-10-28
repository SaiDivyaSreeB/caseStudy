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
   //user:any;
   user={
    fullname:"",
   }
  editProfileForm = new FormGroup({
    Fullname : new FormControl('',Validators.required),
  })
  role:any;
  constructor(private adminAuth:AdminauthService, private admin:AdminService) {
    this.role=this.adminAuth.getRole();
    this.adminName=this.adminAuth.getAdminName();
    this.adminEmail=this.adminAuth.getAdminEmail();
   }
   
  ngOnInit(): void {
  }
  editProfile(){
    this.adminId=this.adminAuth.getId();
    console.log(this.fullname);
    
    this.admin.updateProfile(this.adminId,this.user).subscribe((response)=>{
      console.log(response);
      this.adminAuth.updateName(this.user.fullname);
      this.adminName=this.user.fullname;
    });
  }
  logout(){
    this.adminAuth.logout();
  }
 }
