import { NgModule} from "@angular/core";
import { AdministracionRoutingModule } from "./administracion-routing.module";

import { AreasComunesComponent } from "./areasComunes/areasComunes.component";
import { UnidadesComponent } from "./unidades/unidades.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';  


@NgModule({
    imports: [
        AdministracionRoutingModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule
    ],
    declarations:[
        UnidadesComponent,
        UsuariosComponent,
        AreasComunesComponent
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule
    ]    
})

export class AdministracionModule {
    constructor(){

    }
}