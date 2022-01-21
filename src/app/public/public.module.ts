import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../core/shared/shared.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home.component';

import { RegisterAdminComponent } from './registerAdmin/registerAdmin.component';

import {MatCardModule} from '@angular/material/card';
import { LoginAdminComponent } from './loginAdmin/loginAdmin.component';




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
    LoginAdminComponent,
    RegisterAdminComponent
  ],
  exports: [],
  providers:[]
})
export class PublicModule {

  constructor(){
    
  }

 }
