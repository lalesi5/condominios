import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportesComponent } from "../Reportes/reportes.component";
import { CapturarIngresosComponent } from "./capturarIngresos/capturarIngresos.component";
import { EgresosComponent } from "./egresos/egresos.component";
import { IngresosComponent } from "./ingresos/ingresos.component";
import { IngresosExtraordinariosComponent } from "./ingresosExtraordinarios/ingresosExtraordinarios.component";


const routesReportes: Routes = [
    {
        path: '', component: ReportesComponent, children:
        [
            {path: '', redirectTo: 'ingresos', pathMatch: 'full'},
            {path: 'ingresos', component: IngresosComponent},
            {path: 'egresos', component: EgresosComponent},
            {path: 'capturadorIngresos', component: CapturarIngresosComponent},
            {path: 'ingresosExtraordinarios', component: IngresosExtraordinariosComponent}
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routesReportes)],
    exports: [RouterModule]

})

export class FinanzasRoutingModule {

}