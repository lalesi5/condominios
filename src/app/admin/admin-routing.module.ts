import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from "../core/shared/guards/check-login.guard";

import { AdminComponent } from "./admin.component";
import { InicioComponent } from "./Inicio/inicio.component";



const routesAdmin: Routes = [
    {path: '', component: AdminComponent, children:
        [
            {path: '', redirectTo: 'inicio', pathMatch: 'full'},
            {path: 'inicio', component: InicioComponent, canActivate:[CheckLoginGuard]},
            {path: 'administracion', loadChildren: () => import('./Administracion/administracion.module').then(m => m.AdministracionModule), canActivate:[CheckLoginGuard]},
            {path: 'comunicacion', loadChildren: () => import('./Comunicacion/comunicacion.module').then(m => m.ComunicacionModule), canActivate:[CheckLoginGuard]},
            {path: 'reportes', loadChildren: () => import('./Reportes/reportes.module').then(m => m.ReportesModule), canActivate:[CheckLoginGuard]},
            {path: 'finanzas', loadChildren: () => import('./Finanzas/finanzas.module').then(m => m.FinanzasModule), canActivate:[CheckLoginGuard]},
            {path: 'ajustes', loadChildren: () => import('./Ajustes/ajustes.module').then(m => m.AjustesModule), canActivate:[CheckLoginGuard]},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesAdmin)],
    exports: [RouterModule]

})

export class AdminRoutingModule {}