import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminauthGuardService } from '../services/adminauth-guard.service';
//import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegistationComponent } from './admin-registation/admin-registation.component';
//import { AdminMicroserviceModule } from './admin-microservice.module';
import { AdminComponent } from './admin/admin.component';
import { AssignWasherComponent } from './assign-washer/assign-washer.component';
//import { UnassignedOrdersComponent } from './unassigned/unassigned.component';
import {UnassignedOrdersComponent} from './unassigned/unassigned.component'
import { WashpacksComponent } from './washpacks/washpacks.component';
const routes: Routes = [
  {
    path:'admin',component:AdminComponent,
    children:[
      
      //{path:'login',component:AdminLoginComponent},
      {path:'register',component:AdminRegistationComponent,canActivate:[AdminauthGuardService]},
      //{path:'dashboard',component:AdminDashboardComponent},
      {path:'unassigned',component:UnassignedOrdersComponent,canActivate:[AdminauthGuardService]},
      {path:'unassigned/:id',component:AssignWasherComponent,canActivate:[AdminauthGuardService]},
      {path:'washpacks',component:WashpacksComponent,canActivate:[AdminauthGuardService]},
      // {path:'assignWasher/:id','component':AssignWasherComponent},
      {path:'unassigned/:id',component:AssignWasherComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMicroserviceRoutingModule { }
