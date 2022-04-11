import {NgModule} from "@angular/core";

import {RouterModule, Routes} from '@angular/router';
import {AjustesComponent} from './ajustes.component';
import {AjustesAdminComponent} from "./ajustesAdmin/ajustesAdmin.component";
import {AjustesCondominioComponent} from './ajustesCondominio/ajustesCondominio.component';
import {AjustesAreasComunalesComponent} from './ajustes-areas-comunales/ajustes-areas-comunales.component';
import {AjustesAdminEditComponent} from "./ajustesAdminEdit/ajustesAdminEdit.component";
import {AjustesCondominioEditComponent} from "./ajustesCondominioEdit/ajustesCondominioEdit.component";
import {AjustesAreasComunalesEditComponent} from './ajustes-areas-comunales-edit/ajustes-areas-comunales-edit.component';
import {AjustesAreasComunalesCreateComponent} from './ajustes-areas-comunales-create/ajustes-areas-comunales-create.component';
import {AjustesUnidadesComponent} from './ajustes-unidades/ajustes-unidades.component';
import {AjustesUnidadesEditComponent} from './ajustes-unidades-edit/ajustes-unidades-edit.component';
import {AjustesUnidadesCreateComponent} from './ajustes-unidades-create/ajustes-unidades-create.component';
import {AjustesUsuariosComponent} from "./ajustes-usuarios/ajustes-usuarios.component";
import {AjustesUsuariosCreateComponent} from "./ajustes-usuarios-create/ajustes-usuarios-create.component";
import {AjustesUsuariosEditComponent} from "./ajustes-usuarios-edit/ajustes-usuarios-edit.component";
import {
  AjustesUnidadesSelectUserComponent
} from "./ajustes-unidades-select-user/ajustes-unidades-select-user.component";
import {CuentasComponent} from "./cuentas/cuentas.component";
import {CuentasCreateComponent} from "./cuentas-create/cuentas-create.component";
import {CuentasEditComponent} from "./cuentas-edit/cuentas-edit.component";
import {PagosComponent} from "./pagos/pagos.component";
import {PagerComponent} from "@syncfusion/ej2-angular-grids";
import {PagosCreateComponent} from "./pagos-create/pagos-create.component";
import {PagosEditComponent} from "./pagos-edit/pagos-edit.component";


const routesAjustes: Routes = [
  {
    path: '', component: AjustesComponent, children:
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
        {path: 'ajustesUnidadesCreate', component: AjustesUnidadesCreateComponent},
        {path: 'ajustesUnidadesSelectUser', component: AjustesUnidadesSelectUserComponent},
        {path: 'ajustesUsuarios', component: AjustesUsuariosComponent},
        {path: 'ajustesUsuariosEdit', component: AjustesUsuariosEditComponent},
        {path: 'ajustesUsuariosCreate', component: AjustesUsuariosCreateComponent},
        {path: 'cuentas', component: CuentasComponent},
        {path: 'cuentasCreate', component: CuentasCreateComponent},
        {path: 'cuentasEdit', component: CuentasEditComponent},
        {path: 'pagos', component: PagosComponent},
        {path: 'pagosCreate', component: PagosCreateComponent},
        {path: 'pagosEdit', component: PagosEditComponent}
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesAjustes)],
  exports: [RouterModule]

})

export class AjustesRoutingModule {
}
