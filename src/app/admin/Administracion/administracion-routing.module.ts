import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AdministracionComponent} from "./administracion.component";
import {AreasComunesComponent} from "./areasComunes/areasComunes.component";
import {UnidadesComponent} from "./unidades/unidades.component";
import {UsuariosComponent} from "./usuarios/usuarios.component";
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ReservasComponent} from "./reservas/reservas.component";
import {ReservasCreateComponent} from "./reservas-create/reservas-create.component";
import {ListarUnidadesComponent} from "./unidades/listar-unidades/listar-unidades.component";

const routerAdministracion: Routes = [
  {
    path: '', component: AdministracionComponent, children:
      [
        {path: '', redirectTo: 'listarUnidades', pathMatch: 'full'},
        {path: 'unidades', component: UnidadesComponent},
        {path: 'usuarios', component: UsuariosComponent},
        {path: 'areasComunes', component: AreasComunesComponent},
        {path: 'reservas/:id', component: ReservasComponent},
        {path: 'reservasCreate', component: ReservasCreateComponent},
        {path: 'listarUnidades', component: ListarUnidadesComponent}
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routerAdministracion), CommonModule, ReactiveFormsModule],
  exports: [RouterModule]
})

export class AdministracionRoutingModule {

}
