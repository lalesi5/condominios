import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { UserAnunciosComponent } from "./Anuncios/userAnuncios.component";
import { UserComponent } from "./user.component";


const routesUsuarios: Routes = [
    {path: '', component: UserComponent, children:
        [
            {path: '', redirectTo: 'anuncios', pathMatch: 'full'},
            {path: 'anuncios', component: UserAnunciosComponent},
            {path: 'finanzas'},
            {path: 'areasComunes'},
            {path: 'configuracion'}
            
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesUsuarios)],
    exports: [RouterModule]

})

export class UsuarioRoutingModule {}