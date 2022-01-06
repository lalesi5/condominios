import { NgModule } from "@angular/core";

import { RouterModule, Routes } from '@angular/router';
import { AjustesComponent } from './ajustes.component';
import { AjustesAdminComponent } from "./ajustesAdmin/ajustesAdmin.component";
import { AjustesCondominioComponent } from './ajustesCondominio/ajustesCondominio.component';


const routesAjustes: Routes = [
    {path: '', component: AjustesComponent, children:
        [
            {path: '', redirectTo: 'ajustes_admin', pathMatch: 'full'},
            {path: 'ajustes_admin', component: AjustesAdminComponent},
            {path: 'ajustes_condominio', component: AjustesCondominioComponent}
            
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesAjustes)],
    exports: [RouterModule]

})

export class AjustesRoutingModule {}