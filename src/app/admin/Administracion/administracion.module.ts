import { NgModule } from "@angular/core";
import { AdministracionRoutingModule } from "./administracion-routing.module";

import { UnidadesComponent } from "./unidades/unidades.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { GridModule } from "@syncfusion/ej2-angular-grids";
import { ListarUnidadesComponent } from './unidades/listar-unidades/listar-unidades.component';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { AreasComunesComponent } from "./areas-comunes/areas-comunes.component";
import { AreasComunalesComponent } from './areas-comunales/areas-comunales.component';

@NgModule({
    imports: [
        AdministracionRoutingModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        CommonModule,
        ReactiveFormsModule,
        GridModule,
        DateTimePickerModule,
        MatButtonToggleModule
    ],
    declarations: [
        UnidadesComponent,
        UsuariosComponent,
        AreasComunesComponent,
        ListarUnidadesComponent,
        AreasComunalesComponent
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        CommonModule
    ]
})

export class AdministracionModule {
    constructor() {

    }
}