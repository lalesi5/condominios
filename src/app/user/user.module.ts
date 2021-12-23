import { NgModule } from '@angular/core';
import { UsuarioRoutingModule } from './user-routing.module';

import { UserAnunciosComponent } from './Anuncios/userAnuncios.component';

import { MatCardModule } from '@angular/material/card';
import { UserComponent } from './user.component';



@NgModule({

    imports: [
        UsuarioRoutingModule,
        MatCardModule,
    ],
    declarations: [
        UserComponent,
        UserAnunciosComponent
    ],
    exports: [
    ],
    providers: []
})

export class UserModule {}