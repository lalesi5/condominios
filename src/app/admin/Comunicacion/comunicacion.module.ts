import { NgModule} from "@angular/core";
import { ComunicacionRoutingModule } from "./comunicacion-routing.module";

import { GeneralesComponent } from "./generales/generales.component";
import { IndividualesComponent } from "./individuales/individuales.component";
import { NuevoMensajeComponent } from "./nuevoMensaje/nuevoMensaje.component";
import { MensajeUsuarioComponent } from "./mensajesUsuario/mensajesUsuario.component";
import { NuevoAnuncioComponent } from "./nuevoAnuncio/nuevoAnuncio.component";

import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';  

@NgModule({
    imports: [
        ComunicacionRoutingModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule
    ],
    declarations:[
        GeneralesComponent,
        IndividualesComponent,
        NuevoMensajeComponent,
        MensajeUsuarioComponent,
        NuevoAnuncioComponent
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule
    ]
})

export class ComunicacionModule {
    constructor(){

    }
}
