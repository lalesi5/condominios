import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdministracionComponent } from "./administracion.component";
import { AreasComunesComponent } from "./areasComunes/areasComunes.component";
import { UnidadesComponent } from "./unidades/unidades.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

const routerAdministracion: Routes = [
    {
        path: '', component: AdministracionComponent, children:
        [
            {path: 'unidades', component: UnidadesComponent},
            {path: 'usuarios', component: UsuariosComponent},
            {path: 'areasComunes', component: AreasComunesComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routerAdministracion)],
    exports: [RouterModule]
})

export class AdministracionRoutingModule {

}