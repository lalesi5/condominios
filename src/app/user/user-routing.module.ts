import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';

import {UserAnunciosComponent} from "./Anuncios/userAnuncios.component";
import {UserComponent} from "./user.component";
import {InicioUsuarioComponent} from './inicio/inicioUsuario.component';
import {ComunicacionUsuarioComponent} from './Comunicacion/comunicacionUsuario.component';
import {FinanzasUsuarioComponent} from './Finanzas/finanzasUsuario.component';
import {AreasComunesUsuarioComponent} from './AreasComunes/areasComunesUsuario.component';
import {AjustesUsuarioComponent} from './Ajustes/ajustesUsuario.component';
import {CheckLoginGuard} from "../core/shared/guards/check-login.guard";
import {ResponderComponent} from "./Comunicacion/responder/responder.component";
import {AjustesUserEditComponent} from "./Ajustes/ajustes-user-edit/ajustes-user-edit.component";
import {ReservasComponent} from "./AreasComunes/reservas/reservas.component";
import {ReservasCreateComponent} from "./AreasComunes/reservas-create/reservas-create.component";

const routesUsuarios: Routes = [
  {
    path: '', component: UserComponent, children:
      [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: InicioUsuarioComponent, canActivate: [CheckLoginGuard]},
        {path: 'anuncios', component: UserAnunciosComponent, canActivate: [CheckLoginGuard]},
        {path: 'comunicacion', component: ComunicacionUsuarioComponent, canActivate: [CheckLoginGuard]},
        {path: 'finanzas', component: FinanzasUsuarioComponent, canActivate: [CheckLoginGuard]},
        {path: 'areasComunes', component: AreasComunesUsuarioComponent, canActivate: [CheckLoginGuard]},
        {path: 'ajustes', component: AjustesUsuarioComponent, canActivate: [CheckLoginGuard]},
        {path: 'responder', component: ResponderComponent, canActivate: [CheckLoginGuard]},
        {path: 'editarUsuario', component: AjustesUserEditComponent, canActivate: [CheckLoginGuard]},
        {path: 'reservas', component: ReservasComponent, canActivate: [CheckLoginGuard]},
        {path: 'reservasCreate', component: ReservasCreateComponent, canActivate: [CheckLoginGuard]}
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesUsuarios)],
  exports: [RouterModule]

})

export class UsuarioRoutingModule {
}
