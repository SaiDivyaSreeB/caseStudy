import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-microservice/admin-login/admin-login.component';
import { AdminRegistationComponent } from './admin-microservice/admin-registation/admin-registation.component';
import { AdminComponent } from './admin-microservice/admin/admin.component';
import { CustomerLoginComponent } from './customer-microservice/customer-login/customer-login.component';
import { CustomerRegistrationComponent } from './customer-microservice/customer-registration/customer-registration.component';
import { CustomerComponent } from './customer-microservice/customer/customer.component';
import { HomeComponent } from './home/home.component';
import { AdminauthGuardService } from './services/adminauth-guard.service';
import { WasherLoginComponent } from './washer-microservice/washer-login/washer-login.component';
import { WasherRegistrationComponent } from './washer-microservice/washer-registration/washer-registration.component';
import { WasherComponent } from './washer-microservice/washer/washer.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'adminLogin',component:AdminLoginComponent},
  {path:'customerLogin',component:CustomerLoginComponent},
  {path:'washerLogin',component:WasherLoginComponent},
  //{path:'adminRegister',component:AdminRegistationComponent,canActivate:[AdminauthGuardService]},
  {path:'washerRegister', component:WasherRegistrationComponent},
  {path:'customerRegister',component:CustomerRegistrationComponent},
  {path:'home',component:HomeComponent},
  {path:'washer',component:WasherComponent},
 {path:'customer',component:CustomerComponent},
{path:'admin',component:AdminComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
