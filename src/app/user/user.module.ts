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


@NgModule({

    imports: [
        UsuarioRoutingModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule
    ],
    declarations: [
        UserComponent,
        UserAnunciosComponent,
        NavigationUserComponent,
        InicioUsuarioComponent,
        TopBarUserComponent,
        ComunicacionUsuarioComponent
        
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule
    ],
    providers: []
})

export class UserModule {}