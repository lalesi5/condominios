import { NgModule } from '@angular/core';
import { UsuarioRoutingModule } from './user-routing.module';

import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';  

import { InicioUsuarioComponent } from './inicio/inicioUsuario.component';
import { UserAnunciosComponent } from './Anuncios/userAnuncios.component';
import { UserComponent } from './user.component';
import { NavigationUserComponent } from './components/navigation/navigationUser.component';
import { TopBarUserComponent } from './components/topbar/topbarUser.component';
import { ComunicacionUsuarioComponent } from './Comunicacion/comunicacionUsuario.component';
import { AjustesUsuarioComponent } from './Ajustes/ajustesUsuario.component';
import { AreasComunesUsuarioComponent } from './AreasComunes/areasComunesUsuario.component';
import { FinanzasUsuarioComponent } from './Finanzas/finanzasUsuario.component';
import { CommonModule } from '@angular/common';


@NgModule({

    imports: [
        UsuarioRoutingModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        CommonModule
    ],
    declarations: [
        UserComponent,
        UserAnunciosComponent,
        NavigationUserComponent,
        InicioUsuarioComponent,
        TopBarUserComponent,
        ComunicacionUsuarioComponent,
        AjustesUsuarioComponent,
        AreasComunesUsuarioComponent,
        FinanzasUsuarioComponent
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule
    ],
    providers: []
})

export class UserModule {}