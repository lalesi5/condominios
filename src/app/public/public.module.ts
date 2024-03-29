import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../core/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home.component';
import { RegisterAdminComponent } from './registerAdmin/registerAdmin.component';
import { LoginAdminComponent } from './loginAdmin/loginAdmin.component';
import { SelectCondominioComponent } from './select-condominio/select-condominio.component';
import { CreateCondominioComponent } from './create-condominio/create-condominio.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SelectUnidadesComponent } from './select-unidades/select-unidades.component';
import { ContacComponent } from './contac/contac.component';




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
    SelectCondominioComponent,
    CreateCondominioComponent,
    ForgotPasswordComponent,
    SelectUnidadesComponent,
    ContacComponent
  ],
  exports: [],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class PublicModule {

  constructor() {

  }

}
