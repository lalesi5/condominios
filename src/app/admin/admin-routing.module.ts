import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { AdminComponent } from "./admin.component";
import { AjustesComponent } from "./Ajustes/ajustes.component";
import { InicioComponent } from "./Inicio/inicio.component";
import { FinanzasComponent } from './Finanzas/finanzas.component';


const routesAdmin: Routes = [
    {path: '', component: AdminComponent, children:
        [
            {path: '', redirectTo: 'inicio', pathMatch: 'full'},
            {path: 'inicio', component: InicioComponent},
            {path: 'administracion', loadChildren: () => import('./Administracion/administracion.module').then(m => m.AdministracionModule)},
            {path: 'comunicacion', loadChildren: () => import('./Comunicacion/comunicacion.module').then(m => m.ComunicacionModule)},
            {path: 'reportes', loadChildren: () => import('./Reportes/reportes.module').then(m => m.ReportesModule)},
            {path: 'finanzas', component: FinanzasComponent},
            {path: 'ajustes', component: AjustesComponent},
            
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesAdmin)],
    exports: [RouterModule]

})

export class AdminRoutingModule {

}