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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SelectCondominioComponent } from './select-condominio/select-condominio.component';
import { CreateCondominioComponent } from './create-condominio/create-condominio.component';
import { SelectRolComponent } from './select-rol/select-rol.component';




@NgModule({

  imports: [
    PublicRoutingModule,
    SharedModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MatCommonModule,
    MatIconModule,
    MatInputModule
  ],
  declarations: [
    PublicComponent,
    HomeComponent,
    LoginAdminComponent,
    RegisterAdminComponent,
    LoginUserComponent,
    RegisterUserComponent,
    SelectCondominioComponent,
    CreateCondominioComponent,
    SelectRolComponent
  ],
  exports: [],
  providers:[]
})
export class PublicModule {

  constructor(){
    
  }

 }
