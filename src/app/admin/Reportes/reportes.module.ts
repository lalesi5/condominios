import { NgModule } from '@angular/core';
import { ReportesRoutingModule } from './reportes-routing.module';

import { BalanceComponent } from './balance/balance.component';
import { EgresosReportesComponent } from './egresos/egresosReportes.component';
import { IngresosReportesComponent } from './ingresos/ingresosReportes.component';


import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {GridModule} from "@syncfusion/ej2-angular-grids";

@NgModule({

    imports: [
        ReportesRoutingModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        GridModule
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
