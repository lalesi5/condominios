import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { UserAnunciosComponent } from "./Anuncios/userAnuncios.component";
import { UserComponent } from "./user.component";
import { InicioUsuarioComponent } from './inicio/inicioUsuario.component';
import { ComunicacionUsuarioComponent } from './Comunicacion/comunicacionUsuario.component';
import { FinanzasUsuarioComponent } from './Finanzas/finanzasUsuario.component';
import { AreasComunesUsuarioComponent } from './AreasComunes/areasComunesUsuario.component';
import { AjustesUsuarioComponent } from './Ajustes/ajustesUsuario.component';


const routesUsuarios: Routes = [
    {path: '', component: UserComponent, children:
        [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: InicioUsuarioComponent},
            {path: 'anuncios', component: UserAnunciosComponent},
            {path: 'comunicacion', component: ComunicacionUsuarioComponent},
            {path: 'finanzas', component: FinanzasUsuarioComponent},
            {path: 'areasComunes', component: AreasComunesUsuarioComponent},
            {path: 'ajustes', component: AjustesUsuarioComponent},
            
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesUsuarios)],
    exports: [RouterModule]

})

export class UsuarioRoutingModule {}