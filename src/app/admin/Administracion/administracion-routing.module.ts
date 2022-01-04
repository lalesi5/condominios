import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdministracionComponent } from "./administracion.component";
import { AreasComunesComponent } from "./areasComunes/areasComunes.component";
import { UnidadesComponent } from "./unidades/unidades.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { CommonModule } from '@angular/common';

const routerAdministracion: Routes = [
    {
        path: '', component: AdministracionComponent, children:
        [
            {path: '', redirectTo: 'unidades', pathMatch: 'full'},
            {path: 'unidades', component: UnidadesComponent},
            {path: 'usuarios', component: UsuariosComponent},
            {path: 'areasComunes', component: AreasComunesComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routerAdministracion), CommonModule],
    exports: [RouterModule]
})

export class AdministracionRoutingModule {

}