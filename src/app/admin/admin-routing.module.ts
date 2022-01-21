import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';


import { AdminComponent } from "./admin.component";
import { InicioComponent } from "./Inicio/inicio.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";


const routesAdmin: Routes = [
    {path: '', component: AdminComponent, children:
        [
            {path: '', redirectTo: 'condominios', pathMatch: 'full'},
            {path: 'inicio', component: InicioComponent},
            {path: 'condominios', loadChildren:() => import('./Condominios/condominios.module').then(m => m.CondominiosModule)},
            {path: 'administracion', loadChildren: () => import('./Administracion/administracion.module').then(m => m.AdministracionModule)},
            {path: 'comunicacion', loadChildren: () => import('./Comunicacion/comunicacion.module').then(m => m.ComunicacionModule)},
            {path: 'reportes', loadChildren: () => import('./Reportes/reportes.module').then(m => m.ReportesModule)},
            {path: 'finanzas', loadChildren: () => import('./Finanzas/finanzas.module').then(m => m.FinanzasModule)},
            {path: 'ajustes', loadChildren: () => import('./Ajustes/ajustes.module').then(m => m.AjustesModule)},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesAdmin), CommonModule, ReactiveFormsModule],
    exports: [RouterModule]

})

export class AdminRoutingModule {}