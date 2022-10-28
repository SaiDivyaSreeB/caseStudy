import { Component, OnInit } from '@angular/core';
import { AdminauthService } from 'src/app/services/adminauth.service';
import { FormGroup,Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  username:string='';
  Password:string='';
  LoginForm = new FormGroup({
    username : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    Password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.pattern('((?=.*\\d)(?=.*[a-z]).{8,30})')]),
  })
  constructor(private AdminauthService:AdminauthService) { }
  login(){
    this.AdminauthService.authenticate(this.username, this.Password);
    console.log(this.username);
  }
  ngOnInit(): void {
  }

}
