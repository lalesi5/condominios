import { NgModule } from "@angular/core";
import { SharedModule } from '../../core/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AjustesAdminComponent } from "./ajustesAdmin/ajustesAdmin.component";
import { AjustesCondominioComponent } from './ajustesCondominio/ajustesCondominio.component';

import {MatIconModule} from '@angular/material/icon'; 
import {MatSelectModule} from '@angular/material/select';  
import { AjustesRoutingModule } from './ajuste-routing.module';

@NgModule({

    imports: [
        AjustesRoutingModule,
        SharedModule,
        MatCardModule,
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule
    ],

    declarations: [
        AjustesAdminComponent,
        AjustesCondominioComponent
    ],

    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule
    ],
    providers: []

})

export class AjustesModule {

}