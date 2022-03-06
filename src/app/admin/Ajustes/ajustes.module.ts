import { NgModule } from "@angular/core";
import { SharedModule } from '../../core/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AjustesAdminComponent } from "./ajustesAdmin/ajustesAdmin.component";
import { AjustesCondominioComponent } from './ajustesCondominio/ajustesCondominio.component';

import {MatIconModule} from '@angular/material/icon'; 
import {MatSelectModule} from '@angular/material/select';  
import { AjustesRoutingModule } from './ajuste-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AjustesAdminEditComponent } from './ajustesAdminEdit/ajustesAdminEdit.component';
import { AjustesCondominioEditComponent } from './ajustesCondominioEdit/ajustesCondominioEdit.component';
import { AjustesAreasComunalesComponent } from './ajustes-areas-comunales/ajustes-areas-comunales.component';
import { AjustesAreasComunalesEditComponent } from './ajustes-areas-comunales-edit/ajustes-areas-comunales-edit.component';
import { AjustesAreasComunalesCreateComponent } from './ajustes-areas-comunales-create/ajustes-areas-comunales-create.component';
import { AjustesUnidadesComponent } from './ajustes-unidades/ajustes-unidades.component';
import { AjustesUnidadesEditComponent } from './ajustes-unidades-edit/ajustes-unidades-edit.component';
import { AjustesUnidadesCreateComponent } from './ajustes-unidades-create/ajustes-unidades-create.component';
import { AjustesUsuariosComponent } from './ajustes-usuarios/ajustes-usuarios.component';
import { AjustesUsuariosCreateComponent } from './ajustes-usuarios-create/ajustes-usuarios-create.component';
import { MatCommonModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";

@NgModule({

    imports: [
        AjustesRoutingModule,
        SharedModule,
        MatCardModule,
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatCommonModule,
        MatInputModule
    ],

    declarations: [
        AjustesAdminComponent,
        AjustesAdminEditComponent,
        AjustesCondominioComponent,
        AjustesCondominioEditComponent,
        AjustesAreasComunalesComponent,
        AjustesAreasComunalesEditComponent,
        AjustesAreasComunalesCreateComponent,
        AjustesUnidadesComponent,
        AjustesUnidadesEditComponent,
        AjustesUnidadesCreateComponent,
        AjustesUsuariosComponent,
        AjustesUsuariosCreateComponent,
    ],

    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    providers: []

})

export class AjustesModule {

}