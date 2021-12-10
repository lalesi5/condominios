import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ComunicacionComponent } from "./comunicacion.component";
import { GeneralesComponent } from "./generales/generales.component";
import { IndividualesComponent } from "./individuales/individuales.component";
import { NuevoMensajeComponent } from "./nuevoMensaje/nuevoMensaje.component";

const routesComunicacion: Routes = [
    {
        path: '', component: ComunicacionComponent, children:
        [
            {path: '', redirectTo: 'generales', pathMatch: 'full'},
            {path: 'individuales', component: IndividualesComponent},
            {path: 'generales', component: GeneralesComponent},
            {path: 'nuevo', component: NuevoMensajeComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routesComunicacion)],
    exports: [RouterModule]
})

export class ComunicacionRoutingModule {

}