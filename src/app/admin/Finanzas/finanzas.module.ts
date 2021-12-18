import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/core/shared/shared.module';

import { CapturarIngresosComponent } from './capturarIngresos/capturarIngresos.component';
import { EgresosComponent } from './egresos/egresos.component';
import { FinanzasRoutingModule } from './finanzas-routing.module';
import { IngresosComponent } from './ingresos/ingresos.component';
import { IngresosExtraordinariosComponent } from './ingresosExtraordinarios/ingresosExtraordinarios.component';


@NgModule({
    imports: [
        FinanzasRoutingModule,
        SharedModule
    ],
    declarations:[
        IngresosExtraordinariosComponent,
        IngresosComponent,
        EgresosComponent,
        CapturarIngresosComponent
    ]   
})

export class FinanzasModule{
    constructor(){

    }
}