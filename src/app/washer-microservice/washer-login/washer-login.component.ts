import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from '@angular/forms'
import { WasherauthService } from 'src/app/services/washerauth.service';
@Component({
  selector: 'app-washer-login',
  templateUrl: './washer-login.component.html',
  styleUrls: ['./washer-login.component.css']
})
export class WasherLoginComponent implements OnInit {
  username:string='';
  Password:string='';
  LoginForm = new FormGroup({
    username : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    Password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.pattern('((?=.*\\d)(?=.*[a-z]).{8,30})')]),
  })
  constructor(private WasherauthService:WasherauthService) { }
  login(){
    this.WasherauthService.authenticate(this.username, this.Password);
    console.log(this.username);
  }
  getForm(){

  }
  ngOnInit(): void {
  }

}
