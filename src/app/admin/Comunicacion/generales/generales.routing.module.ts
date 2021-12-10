import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { GeneralesComponent } from "./generales.component";
import { GeneralesNuevoComponent } from "./nuevo/generalesNuevo.component";

const routesGenerales: Routes = [
    {
        path: '', component: GeneralesComponent, children:
        [
            {path: 'nuevo', component: GeneralesNuevoComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routesGenerales)],
    exports: [RouterModule]
})

export class GeneralesRoutingModule {

}