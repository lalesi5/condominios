import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../core/shared/shared.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {MatCardModule} from '@angular/material/card';




@NgModule({

  imports: [
    PublicRoutingModule,
    SharedModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  declarations: [
    PublicComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [],
  providers:[]
})
export class PublicModule {

  constructor(){
    
  }

 }
