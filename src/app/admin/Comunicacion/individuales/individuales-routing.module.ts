import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IndividualesComponent } from "./individuales.component";
import { IndividualesNuevoComponent } from "./nuevo/individualesNuevo.component";

const routesIndividuales: Routes = [
    {
        path: '', component: IndividualesComponent, children:
        [
            {path: 'nuevo', component: IndividualesNuevoComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routesIndividuales)],
    exports: [RouterModule]
})

export class IndividualesRoutingModule {

}