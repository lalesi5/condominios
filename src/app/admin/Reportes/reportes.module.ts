import { NgModule } from '@angular/core';
import { ReportesRoutingModule } from './reportes-routing.module';

import { BalanceComponent } from './balance/balance.component';
import { EgresosReportesComponent } from './egresos/egresosReportes.component';
import { IngresosReportesComponent } from './ingresos/ingresosReportes.component';


import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';  

@NgModule({

    imports: [
        ReportesRoutingModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule
    ],
    declarations: [
        BalanceComponent,
        EgresosReportesComponent,
        IngresosReportesComponent
    ],
    exports: [

    ],
    providers: []
})
export class ReportesModule {

    constructor() {

    }

}