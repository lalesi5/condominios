import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { BalanceComponent } from './balance/balance.component';
import { EgresosReportesComponent } from './egresos/egresosReportes.component';
import { IngresosReportesComponent } from './ingresos/ingresosReportes.component';
import { ReportesRoutingModule } from './reportes-routing.module';



@NgModule({

    imports: [
        ReportesRoutingModule,
        SharedModule
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