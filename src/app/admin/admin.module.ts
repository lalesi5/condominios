import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../core/shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdministracionComponent } from './Administracion/administracion.component';



@NgModule({

    imports: [
        AdminRoutingModule,
        SharedModule
    ],
    declarations: [
        AdminComponent,
        AdministracionComponent
    ],
    exports: [],
    providers: []
})
export class AdminModule {

    constructor() {

    }

}