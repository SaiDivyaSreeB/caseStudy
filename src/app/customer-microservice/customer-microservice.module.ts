import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerMicroserviceRoutingModule } from './customer-microservice-routing.module';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerComponent } from './customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
//import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { FormsModule } from '@angular/forms';
import { ViewRatingsComponent } from './view-ratings/view-ratings.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination'
import { ViewWashpacksComponent } from './view-washpacks/view-washpacks.component';
@NgModule({
  declarations: [
    CustomerLoginComponent,
    CustomerComponent,
    CustomerRegistrationComponent,
    //CustomerDashboardComponent,
    PlaceOrderComponent,
    PendingOrdersComponent,
    ViewRatingsComponent,
   ViewWashpacksComponent
   
  ],
  imports: [
    CommonModule,
    CustomerMicroserviceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStarRatingModule,
    MatIconModule,
    MatButtonModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ]
})
export class CustomerMicroserviceModule { }
