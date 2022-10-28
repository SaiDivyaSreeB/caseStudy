import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { WasherMicroserviceModule } from './washer-microservice/washer-microservice.module';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WasherauthInterceptorService } from './services/washerauth-interceptor.service';
import { WasherauthGuardService } from './services/washerauth-guard.service';
import { CustomerMicroserviceModule } from './customer-microservice/customer-microservice.module';
import { CustomerauthGuardService } from './services/customerauth-guard.service';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { AdminMicroserviceModule } from './admin-microservice/admin-microservice.module';
import { AdminauthGuardService } from './services/adminauth-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminMicroserviceModule,
    WasherMicroserviceModule,
    CustomerMicroserviceModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    NgxStarRatingModule
  ],
 
  providers: [WasherauthGuardService,CustomerauthGuardService,AdminauthGuardService,{
    provide:HTTP_INTERCEPTORS,useClass:WasherauthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
