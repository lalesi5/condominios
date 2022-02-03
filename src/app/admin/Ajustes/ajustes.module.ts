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

@NgModule({

    imports: [
        AjustesRoutingModule,
        SharedModule,
        MatCardModule,
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule
    ],

    declarations: [
        AjustesAdminComponent,
        AjustesAdminEditComponent,
        AjustesCondominioComponent,
        AjustesCondominioEditComponent,
        AjustesAreasComunalesComponent
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