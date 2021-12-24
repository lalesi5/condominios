import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BalanceComponent } from "./balance/balance.component";
import { EgresosReportesComponent } from "./egresos/egresosReportes.component";
import { IngresosReportesComponent } from "./ingresos/ingresosReportes.component";
import { ReportesComponent } from "./reportes.component";


const routesReportes: Routes = [
    {
        path: '', component: ReportesComponent, children:
            [
                {path: '', redirectTo: 'balance', pathMatch: 'full'},
                {path: 'balance', component: BalanceComponent},
                {path: 'egresosReportes', component: EgresosReportesComponent},
                {path: 'ingresosReportes', component: IngresosReportesComponent}
            ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesReportes)],
    exports: [RouterModule]

})

export class ReportesRoutingModule {

}