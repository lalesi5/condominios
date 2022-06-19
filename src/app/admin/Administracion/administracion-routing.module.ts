import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdministracionComponent } from "./administracion.component";
import { UnidadesComponent } from "./unidades/unidades.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { ListarUnidadesComponent } from "./unidades/listar-unidades/listar-unidades.component";
import { CheckLoginGuard } from "src/app/core/shared/guards/check-login.guard";
import {AreasComunalesComponent} from "./areas-comunales/areas-comunales.component";

const routerAdministracion: Routes = [
  {
    path: '', component: AdministracionComponent, children:
      [
        { path: '', redirectTo: 'listarUnidades', pathMatch: 'full' },
        { path: 'unidades', component: UnidadesComponent },
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'listarUnidades', component: ListarUnidadesComponent },
        {
          path: 'areasComunes',
          loadChildren: () => import('./areas-comunes/areas-comunes.module').then(m => m.AreasComunesModule),
          canActivate: [CheckLoginGuard]
        },
        {path: 'areasComunales', component: AreasComunalesComponent}
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routerAdministracion), CommonModule, ReactiveFormsModule],
  exports: [RouterModule]
})

export class AdministracionRoutingModule {

}
