import { NgModule } from '@angular/core';
import { FinanzasRoutingModule } from './finanzas-routing.module';

import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';  

import { EgresosFinanzasComponent } from './egresosFinanzas/egresosFinanzas.component';
import { IngresosExtraordinariosFinanzasComponent } from './ingresosExtraordinariosFinanzas/ingresosExtraordinariosFinanzas.component';
import { IngresosFinanzasComponent } from './ingresosFinanzas/ingresosFinanzas.component';

@NgModule({

    imports: [
        FinanzasRoutingModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule
    ],
    declarations: [
        EgresosFinanzasComponent,
        IngresosExtraordinariosFinanzasComponent,
        IngresosFinanzasComponent
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule
    ],
    providers: []
})
export class FinanzasModule {

    constructor() {

    }

}