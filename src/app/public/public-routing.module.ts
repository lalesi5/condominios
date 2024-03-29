import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {PublicComponent} from "./public.component";
import {HomeComponent} from "./home/containers/home.component";


import {LoginAdminComponent} from './loginAdmin/loginAdmin.component';
import {RegisterAdminComponent} from './registerAdmin/registerAdmin.component';
import {SelectCondominioComponent} from "./select-condominio/select-condominio.component";
import {CreateCondominioComponent} from './create-condominio/create-condominio.component';
import {CheckLoginGuard} from "../core/shared/guards/check-login.guard";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {SelectUnidadesComponent} from "./select-unidades/select-unidades.component";
import {ContacComponent} from "./contac/contac.component";


const routes: Routes = [
  {
    path: '', component: PublicComponent, children:
      [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomeComponent},
        {path: 'loginAdmin', component: LoginAdminComponent},
        {path: 'registerAdmin', component: RegisterAdminComponent},
        {path: 'forgotPassword', component: ForgotPasswordComponent},
        {path: 'selectCondominio', component: SelectCondominioComponent, canActivate: [CheckLoginGuard]},
        {path: 'createCondominio', component: CreateCondominioComponent, canActivate: [CheckLoginGuard]},
        {path: 'selectUnidad', component: SelectUnidadesComponent, canActivate: [CheckLoginGuard]},
        {path: 'contacto', component: ContacComponent}
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})

export class PublicRoutingModule {

}
