import { NgModule} from "@angular/core";
import { ComunicacionRoutingModule } from "./comunicacion-routing.module";
import { SharedModule } from '../../core/shared/shared.module';
import { CommonModule } from '@angular/common';

import { GeneralesComponent } from "./generales/generales.component";
import { IndividualesComponent } from "./individuales/individuales.component";
import { NuevoMensajeComponent } from "./nuevoMensaje/nuevoMensaje.component";
import { MensajeUsuarioComponent } from "./mensajesUsuario/mensajesUsuario.component";
import { NuevoAnuncioComponent } from "./nuevoAnuncio/nuevoAnuncio.component";

import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { EditarAnuncioComponent } from './editar-anuncio/editar-anuncio.component';  
import { ReactiveFormsModule } from '@angular/forms';
import { EditarMensajeComponent } from './editar-mensaje/editar-mensaje.component';
import { GridModule } from "@syncfusion/ej2-angular-grids";
import { MensajesUsuarioEnviadosComponent } from './mensajes-usuario-enviados/mensajes-usuario-enviados.component';
import { MatButtonToggleModule } from "@angular/material/button-toggle";


@NgModule({
    imports: [
        ComunicacionRoutingModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        GridModule,
        MatButtonToggleModule
    ],
    declarations:[
        GeneralesComponent,
        IndividualesComponent,
        NuevoMensajeComponent,
        MensajeUsuarioComponent,
        NuevoAnuncioComponent,
        EditarAnuncioComponent,
        EditarMensajeComponent,
        MensajesUsuarioEnviadosComponent
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        MatButtonToggleModule
    ]
})

export class ComunicacionModule {
    constructor(){

    }
}
