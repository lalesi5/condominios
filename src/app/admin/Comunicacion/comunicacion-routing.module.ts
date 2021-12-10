import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ComunicacionComponent } from "./comunicacion.component";
import { IndividualesComponent } from "./individuales/individuales.component";

const routesComunicacion: Routes = [
    {
        path: '', component: ComunicacionComponent, children:
        [
            {path: '', redirectTo: 'generales', pathMatch: 'full'},
            {path: 'individuales', loadChildren: () => import('./individuales/individuales.module').then(m => m.IndividualesModule)},
            {path: 'generales', loadChildren: () => import('./generales/generales.module').then(m => m.GeneralesModule)}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routesComunicacion)],
    exports: [RouterModule]
})

export class ComunicacionRoutingModule {

}