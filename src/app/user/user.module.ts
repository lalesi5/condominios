import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserAnunciosComponent } from './Anuncios/userAnuncios.component';

import { MatCardModule } from '@angular/material/card';
import { TopBarComponent } from '../admin/components/topbar/topbar.component';

@NgModule({

    imports: [
        UserRoutingModule,
        SharedModule,
        MatCardModule,
        TopBarComponent
    ],
    declarations: [
        UserAnunciosComponent
    ],
    exports: [
        MatCardModule
    ],
    providers: []
})
export class UserModule {

    constructor() {

    }

}