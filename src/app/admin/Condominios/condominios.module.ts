import { NgModule } from '@angular/core';
import { CondominiosRoutingModule } from './condominios-routing.module';
import { CommonModule } from '@angular/common';
import { CrearCondominiosComponent } from './CrearCondominios/crearCondominios.component';
import { ListarCondominiosComponent } from './ListarCondominios/listarCondominios.component';

import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';  

@NgModule({

    imports: [
        CondominiosRoutingModule,
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
    ],
    declarations: [
        CrearCondominiosComponent,
        ListarCondominiosComponent
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        CommonModule
    ],
})

export class CondominiosModule {}