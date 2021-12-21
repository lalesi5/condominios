import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EgresosFinanzasComponent } from "./egresosFinanzas/egresosFinanzas.component";
import { FinanzasComponent } from './finanzas.component';
import { IngresosFinanzasComponent } from "./ingresosFinanzas/ingresosFinanzas.component";


const routesFinanzas: Routes = [
    {path: '', component: FinanzasComponent, children:
        [
            {path: '', redirectTo: 'ingresosFinanzas', pathMatch: 'full'},
            {path: 'ingresosFinanzas', component: IngresosFinanzasComponent},
            {path: 'egresosFinanzas', component: EgresosFinanzasComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesFinanzas)],
    exports: [RouterModule]

})

export class FinanzasRoutingModule {

}