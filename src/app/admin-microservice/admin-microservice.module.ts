import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMicroserviceRoutingModule } from './admin-microservice-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegistationComponent } from './admin-registation/admin-registation.component';
//import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UnassignedOrdersComponent } from './unassigned/unassigned.component';
import { AssignWasherComponent } from './assign-washer/assign-washer.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { WashpacksComponent } from './washpacks/washpacks.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShowLessMoreComponent } from './show-less-more/show-less-more.component';
@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminRegistationComponent,
    //AdminDashboardComponent,
    UnassignedOrdersComponent,
    AssignWasherComponent,
    WashpacksComponent,
    ShowLessMoreComponent,
   //SeeMoreLessComponent
  
  ],
  imports: [
    CommonModule,
    AdminMicroserviceRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class AdminMicroserviceModule { }
