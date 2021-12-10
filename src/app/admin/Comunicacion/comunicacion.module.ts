import { NgModule} from "@angular/core";
import { ComunicacionRoutingModule } from "./comunicacion-routing.module";

import { GeneralesComponent } from "./generales/generales.component";
import { IndividualesComponent } from "./individuales/individuales.component";

import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 
import { NuevoMensajeComponent } from "./nuevoMensaje/nuevoMensaje.component";

@NgModule({
    imports: [
        ComunicacionRoutingModule,
        MatCardModule,
        MatIconModule
    ],
    declarations:[
        GeneralesComponent,
        IndividualesComponent,
        NuevoMensajeComponent
    ],
    exports: [
        MatCardModule,
        MatIconModule
    ]
})

export class ComunicacionModule {
    constructor(){

    }
}
