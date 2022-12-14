import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WasherComponent } from './washer/washer.component';
import { WasherMicroserviceRoutingModule } from './washer-microservice-routing.module';
import { WasherRegistrationComponent } from './washer-registration/washer-registration.component';
import { WasherLoginComponent } from './washer-login/washer-login.component';
import { WasherOrdersComponent } from './washer-orders/washer-orders.component';
import { UnassignedOrdersComponent } from './unassigned-orders/unassigned-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider'
import { NgxPaginationModule } from 'ngx-pagination';
import { RatingsComponent } from './ratings/ratings.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
   WasherComponent,
  WasherRegistrationComponent,
    WasherLoginComponent,
    WasherOrdersComponent,
   UnassignedOrdersComponent,
   RatingsComponent,
],
  imports: [
    CommonModule,
    WasherMicroserviceRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class WasherMicroserviceModule { }
