import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../core/shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdministracionComponent } from './Administracion/administracion.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MainComponent } from './components/main/main.component';
import { TopBarComponent } from './components/topbar/topbar.component';



@NgModule({

    imports: [
        AdminRoutingModule,
        SharedModule
    ],
    declarations: [
        AdminComponent,
        AdministracionComponent,
        NavigationComponent,
        MainComponent,
        TopBarComponent
    ],
    exports: [],
    providers: []
})
export class AdminModule {

    constructor() {

    }

}