import { NgModule } from "@angular/core";
import { SharedModule } from '../../core/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AjustesAdminComponent } from "./ajustesAdmin/ajustesAdmin.component";
import { AjustesCondominioComponent } from './ajustesCondominio/ajustesCondominio.component';

import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { AjustesRoutingModule } from './ajuste-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AjustesAdminEditComponent } from './ajustesAdminEdit/ajustesAdminEdit.component';
import { AjustesCondominioEditComponent } from './ajustesCondominioEdit/ajustesCondominioEdit.component';
import { AjustesAreasComunalesComponent } from './ajustes-areas-comunales/ajustes-areas-comunales.component';
import { AjustesAreasComunalesEditComponent } from './ajustes-areas-comunales-edit/ajustes-areas-comunales-edit.component';
import { AjustesAreasComunalesCreateComponent } from './ajustes-areas-comunales-create/ajustes-areas-comunales-create.component';
import { AjustesUnidadesComponent } from './ajustes-unidades/ajustes-unidades.component';
import { AjustesUnidadesEditComponent } from './ajustes-unidades-edit/ajustes-unidades-edit.component';
import { AjustesUnidadesCreateComponent } from './ajustes-unidades-create/ajustes-unidades-create.component';
import { AjustesUnidadesSelectUserComponent } from './ajustes-unidades-select-user/ajustes-unidades-select-user.component';
import { AjustesUsuariosComponent } from './ajustes-usuarios/ajustes-usuarios.component';
import { AjustesUsuariosCreateComponent } from './ajustes-usuarios-create/ajustes-usuarios-create.component';
import { MatCommonModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { AjustesUsuariosEditComponent } from './ajustes-usuarios-edit/ajustes-usuarios-edit.component';
import { GridModule } from "@syncfusion/ej2-angular-grids";
import { CuentasComponent } from './cuentas/cuentas.component';
import { CuentasCreateComponent } from './cuentas-create/cuentas-create.component';
import { CuentasEditComponent } from './cuentas-edit/cuentas-edit.component';
import { PagosComponent } from './pagos/pagos.component';
import { PagosCreateComponent } from './pagos-create/pagos-create.component';
import { PagosEditComponent } from './pagos-edit/pagos-edit.component';
import { DescuentosComponent } from './descuentos/descuentos.component';
import { DescuentosCreateComponent } from './descuentos-create/descuentos-create.component';
import { DescuentosEditComponent } from './descuentos-edit/descuentos-edit.component';

@NgModule({

    imports: [
        AjustesRoutingModule,
        SharedModule,
        MatCardModule,
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatCommonModule,
        MatInputModule,
        GridModule,
    ],

    declarations: [
        AjustesAdminComponent,
        AjustesAdminEditComponent,
        AjustesCondominioComponent,
        AjustesCondominioEditComponent,
        AjustesAreasComunalesComponent,
        AjustesAreasComunalesEditComponent,
        AjustesAreasComunalesCreateComponent,
        AjustesUnidadesComponent,
        AjustesUnidadesEditComponent,
        AjustesUnidadesCreateComponent,
        AjustesUsuariosComponent,
        AjustesUsuariosCreateComponent,
        AjustesUsuariosEditComponent,
        AjustesUnidadesSelectUserComponent,
        CuentasComponent,
        CuentasCreateComponent,
        CuentasEditComponent,
        PagosComponent,
        PagosCreateComponent,
        PagosEditComponent,
        DescuentosComponent,
        DescuentosCreateComponent,
        DescuentosEditComponent,
    ],

    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    providers: []

})

export class AjustesModule {

}
