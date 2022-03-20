import { NgModule} from "@angular/core";
import { AdministracionRoutingModule } from "./administracion-routing.module";

import { AreasComunesComponent } from "./areasComunes/areasComunes.component";
import { UnidadesComponent } from "./unidades/unidades.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';  
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { ReservasComponent } from './reservas/reservas.component';
import { ReservasCreateComponent } from './reservas-create/reservas-create.component';
import { GridModule } from "@syncfusion/ej2-angular-grids";



@NgModule({
    imports: [
        AdministracionRoutingModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        CommonModule,
        ReactiveFormsModule,
        GridModule
    ],
    declarations:[
        UnidadesComponent,
        UsuariosComponent,
        AreasComunesComponent,
        ReservasComponent,
        ReservasCreateComponent
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        CommonModule
    ]    
})

export class AdministracionModule {
    constructor(){

    }
}