import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../core/shared/shared.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home.component';

import { RegisterAdminComponent } from './registerAdmin/registerAdmin.component';

import {MatCardModule} from '@angular/material/card';
import { LoginAdminComponent } from './loginAdmin/loginAdmin.component';
import { LoginUserComponent } from './loginUser/loginUser.component';
import { RegisterUserComponent } from './registerUser/registerUser.component';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { SelectCondominioComponent } from './select-condominio/select-condominio.component';




@NgModule({

  imports: [
    PublicRoutingModule,
    SharedModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MatCommonModule
  ],
  declarations: [
    PublicComponent,
    HomeComponent,
    LoginAdminComponent,
    RegisterAdminComponent,
    LoginUserComponent,
    RegisterUserComponent,
    SelectCondominioComponent
  ],
  exports: [],
  providers:[]
})
export class PublicModule {

  constructor(){
    
  }

 }
