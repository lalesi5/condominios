import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ComunicacionComponent } from "./comunicacion.component";
import { GeneralesComponent } from "./generales/generales.component";
import { IndividualesComponent } from "./individuales/individuales.component";
import { MensajeUsuarioComponent } from "./mensajesUsuario/mensajesUsuario.component";
import { NuevoAnuncioComponent } from "./nuevoAnuncio/nuevoAnuncio.component";
import { NuevoMensajeComponent } from "./nuevoMensaje/nuevoMensaje.component";
import { EditarAnuncioComponent } from './editar-anuncio/editar-anuncio.component';
import { EditarMensajeComponent } from "./editar-mensaje/editar-mensaje.component";

const routesComunicacion: Routes = [
    {
        path: '', component: ComunicacionComponent, children:
        [
            {path: '', redirectTo: 'generales', pathMatch: 'full'},
            {path: 'individuales', component: IndividualesComponent},
            {path: 'generales', component: GeneralesComponent},
            {path: 'nuevoMensaje', component: NuevoMensajeComponent},
            {path: 'nuevoAnuncio', component: NuevoAnuncioComponent},
            {path: 'mensajeUsuario', component: MensajeUsuarioComponent},
            {path: 'editarAnuncio/:id', component: EditarAnuncioComponent},
            {path: 'editarMensaje/:id', component: EditarMensajeComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routesComunicacion)],
    exports: [RouterModule]
})

export class ComunicacionRoutingModule {

}