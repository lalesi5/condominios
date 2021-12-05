import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { AdminComponent } from "./admin.component";
import { AdministracionComponent } from "./Administracion/administracion.component";


const routesAdmin: Routes = [
    {path: '', component: AdminComponent, children:
        [
            {path: '', redirectTo: 'administracion', pathMatch: 'full'},
            {path: 'administracion', component: AdministracionComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesAdmin)],
    exports: [RouterModule]

})

export class AdminRoutingModule {

}