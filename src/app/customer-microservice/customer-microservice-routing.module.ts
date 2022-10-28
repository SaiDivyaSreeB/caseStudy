import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { CustomerComponent } from './customer/customer.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ViewRatingsComponent } from './view-ratings/view-ratings.component';
import { ViewWashpacksComponent } from './view-washpacks/view-washpacks.component';
import { CustomerauthGuardService } from '../services/customerauth-guard.service';
const routes: Routes = [
  {path:'customer',component:CustomerComponent,
  children:
  [
  //{path:'dashboard',component:CustomerDashboardComponent},
   {path:'login',component:CustomerLoginComponent},
  
  {path:'register',component:CustomerRegistrationComponent},
  {path:'placeOrder',component:PlaceOrderComponent,canActivate:[CustomerauthGuardService]},
  {path:'pendingOrders',component:PendingOrdersComponent,canActivate:[CustomerauthGuardService]},
  {path:'viewRatings',component:ViewRatingsComponent,canActivate:[CustomerauthGuardService]},
  {path:'viewWashpacks',component:ViewWashpacksComponent,canActivate:[CustomerauthGuardService]},
  {path:'placeOrder/:id',component:PlaceOrderComponent,canActivate:[CustomerauthGuardService]},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerMicroserviceRoutingModule { }
