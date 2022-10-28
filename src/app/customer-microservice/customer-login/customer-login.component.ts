import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerauthService } from 'src/app/services/customerauth.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {
  username:string='';
  Password:string='';
  LoginForm = new FormGroup({
    username : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    Password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.pattern('((?=.*\\d)(?=.*[a-z]).{8,30})')]),//,Validators.pattern('((?=.*[a-z])(?=.[A-Z]).{8,30}'))]
  })
  constructor(private customerAuth:CustomerauthService) { }

  ngOnInit(): void {
  }
  login(){
     this.customerAuth.authenticate(this.username, this.Password);
     console.log(this.username);
  }

}
