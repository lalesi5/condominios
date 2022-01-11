import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../core/shared/shared.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {MatCardModule} from '@angular/material/card';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';




@NgModule({

  imports: [
    PublicRoutingModule,
    SharedModule,
    MatCardModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
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
