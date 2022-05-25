import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';

import {UserAnunciosComponent} from "./Anuncios/userAnuncios.component";
import {UserComponent} from "./user.component";
import {InicioUsuarioComponent} from './inicio/inicioUsuario.component';
import {ComunicacionUsuarioComponent} from './Comunicacion/comunicacionUsuario.component';
import {FinanzasUsuarioComponent} from './Finanzas/finanzasUsuario.component';
import {AjustesUsuarioComponent} from './Ajustes/ajustesUsuario.component';
import {CheckLoginGuard} from "../core/shared/guards/check-login.guard";
import {ResponderComponent} from "./Comunicacion/responder/responder.component";
import {AjustesUserEditComponent} from "./Ajustes/ajustes-user-edit/ajustes-user-edit.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

const routesUsuarios: Routes = [
  {
    path: '', component: UserComponent, children:
      [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: InicioUsuarioComponent, canActivate: [CheckLoginGuard]},
        {path: 'anuncios', component: UserAnunciosComponent, canActivate: [CheckLoginGuard]},
        {path: 'comunicacion', component: ComunicacionUsuarioComponent, canActivate: [CheckLoginGuard]},
        {path: 'finanzas', component: FinanzasUsuarioComponent, canActivate: [CheckLoginGuard]},
        {
          path: 'areasComunes',
          loadChildren: () => import('./AreasComunes/areasComunesUsuario.module').then(m => m.AreasComunesUsuariosModule),
          canActivate: [CheckLoginGuard]
        },
        {path: 'ajustes', component: AjustesUsuarioComponent, canActivate: [CheckLoginGuard]},
        {path: 'responder', component: ResponderComponent, canActivate: [CheckLoginGuard]},
        {path: 'editarUsuario', component: AjustesUserEditComponent, canActivate: [CheckLoginGuard]},
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesUsuarios), CommonModule, ReactiveFormsModule],
  exports: [RouterModule]

})

export class UsuarioRoutingModule {
}
