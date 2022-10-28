import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { UnassignedOrdersComponent } from './unassigned-orders/unassigned-orders.component';
import { WasherLoginComponent } from './washer-login/washer-login.component';
import { WasherOrdersComponent } from './washer-orders/washer-orders.component';
import { WasherRegistrationComponent } from './washer-registration/washer-registration.component';
import { WasherComponent } from './washer/washer.component';
import { WasherauthGuardService } from '../services/washerauth-guard.service';
const routes:Routes=[
  {
    path:'washer',component:WasherComponent,
    children:[
      {path:'login',component:WasherLoginComponent},
      {path:'register', component:WasherRegistrationComponent},
      {path:'myOrders',component:WasherOrdersComponent,canActivate:[WasherauthGuardService]},
      {path:'unassignedOrders',  component:UnassignedOrdersComponent,canActivate:[WasherauthGuardService]}
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class WasherMicroserviceRoutingModule { }
