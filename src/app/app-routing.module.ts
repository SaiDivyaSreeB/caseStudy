import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin-microservice/admin/admin.component';
import { CustomerComponent } from './customer-microservice/customer/customer.component';
import { HomeComponent } from './home/home.component';
import { WasherComponent } from './washer-microservice/washer/washer.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'washer',component:WasherComponent},
 {path:'customer',component:CustomerComponent},
{path:'admin',component:AdminComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
