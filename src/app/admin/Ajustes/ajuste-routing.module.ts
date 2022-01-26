import { NgModule } from "@angular/core";

import { RouterModule, Routes } from '@angular/router';
import { AjustesComponent } from './ajustes.component';
import { AjustesAdminComponent } from "./ajustesAdmin/ajustesAdmin.component";
import { AjustesCondominioComponent } from './ajustesCondominio/ajustesCondominio.component';
import { AjustesAdminEditComponent } from './ajustesAdminEdit/ajustesAdminEdit.component';


const routesAjustes: Routes = [
    {path: '', component: AjustesComponent, children:
        [
            {path: '', redirectTo: 'ajustesAdmin', pathMatch: 'full'},
            {path: 'ajustesAdmin', component: AjustesAdminComponent},
            {path: 'ajustesAdminEdit', component: AjustesAdminEditComponent},
            {path: 'ajustes_condominio', component: AjustesCondominioComponent}
            
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesAjustes)],
    exports: [RouterModule]

})

export class AjustesRoutingModule {}