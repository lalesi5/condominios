import { NgModule } from "@angular/core";

import { RouterModule, Routes } from '@angular/router';
import { AjustesComponent } from './ajustes.component';
import { AjustesAdminComponent } from "./ajustesAdmin/ajustesAdmin.component";
import { AjustesCondominioComponent } from './ajustesCondominio/ajustesCondominio.component';
import { AjustesAdminEditComponent } from './ajustesAdminEdit/ajustesAdminEdit.component';
import { AjustesCondominioEditComponent } from './ajustesCondominioEdit/ajustesCondominioEdit.component';
import { AjustesAreasComunalesComponent } from './ajustes-areas-comunales/ajustes-areas-comunales.component';


const routesAjustes: Routes = [
    {path: '', component: AjustesComponent, children:
        [
            {path: '', redirectTo: 'ajustesAdmin', pathMatch: 'full'},
            {path: 'ajustesAdmin', component: AjustesAdminComponent},
            {path: 'ajustesAdminEdit', component: AjustesAdminEditComponent},
            {path: 'ajustesCondominio', component: AjustesCondominioComponent},
            {path: 'ajustesCondominioEdit', component: AjustesCondominioEditComponent},
            {path: 'ajustesAreasComunales', component: AjustesAreasComunalesComponent}
            
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesAjustes)],
    exports: [RouterModule]

})

export class AjustesRoutingModule {}