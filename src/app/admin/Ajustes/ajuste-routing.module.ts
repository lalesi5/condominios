import { NgModule } from "@angular/core";

import { RouterModule, Routes } from '@angular/router';
import { AjustesComponent } from './ajustes.component';
import { AjustesAdminComponent } from "./ajustesAdmin/ajustesAdmin.component";
import { AjustesCondominioComponent } from './ajustesCondominio/ajustesCondominio.component';
import { AjustesAreasComunalesComponent } from './ajustes-areas-comunales/ajustes-areas-comunales.component';
import { AjustesAdminEditComponent } from "./ajustesAdminEdit/ajustesAdminEdit.component";
import { AjustesCondominioEditComponent } from "./ajustesCondominioEdit/ajustesCondominioEdit.component";
import { AjustesAreasComunalesEditComponent } from './ajustes-areas-comunales-edit/ajustes-areas-comunales-edit.component';
import { AjustesAreasComunalesCreateComponent } from './ajustes-areas-comunales-create/ajustes-areas-comunales-create.component';
import { AjustesUnidadesComponent } from './ajustes-unidades/ajustes-unidades.component';
import { AjustesUnidadesEditComponent } from './ajustes-unidades-edit/ajustes-unidades-edit.component';
import { AjustesUnidadesCreateComponent } from './ajustes-unidades-create/ajustes-unidades-create.component';


const routesAjustes: Routes = [
    {path: '', component: AjustesComponent, children:
        [
            {path: '', redirectTo: 'ajustesAdmin', pathMatch: 'full'},
            {path: 'ajustesAdmin', component: AjustesAdminComponent},
            {path: 'ajustesAdminEdit', component: AjustesAdminEditComponent},
            {path: 'ajustesCondominio', component: AjustesCondominioComponent},
            {path: 'ajustesCondominioEdit', component: AjustesCondominioEditComponent},
            {path: 'ajustesAreasComunales', component: AjustesAreasComunalesComponent},
            {path: 'ajustesAreasComunalesEdit', component: AjustesAreasComunalesEditComponent},
            {path: 'ajustesAreasComunalesCreate', component: AjustesAreasComunalesCreateComponent},
            {path: 'ajustesUnidades', component: AjustesUnidadesComponent},
            {path: 'ajustesUnidadesEdit', component: AjustesUnidadesEditComponent},
            {path: 'ajustesUnidadesCreate', component: AjustesUnidadesCreateComponent}
            
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesAjustes)],
    exports: [RouterModule]

})

export class AjustesRoutingModule {}