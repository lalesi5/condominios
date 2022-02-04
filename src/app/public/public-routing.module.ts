import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PublicComponent } from "./public.component";
import { HomeComponent } from "./home/containers/home.component";


import { LoginAdminComponent } from './loginAdmin/loginAdmin.component';
import { RegisterAdminComponent } from './registerAdmin/registerAdmin.component';
import { LoginUserComponent } from './loginUser/loginUser.component';
import { SelectCondominioComponent } from "./select-condominio/select-condominio.component";




const routes: Routes = [
    {path: '', component: PublicComponent, children:
        [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'loginAdmin', component: LoginAdminComponent},
            {path: 'registerAdmin', component: RegisterAdminComponent},
            {path: 'loginUser', component: LoginUserComponent},
            {path: 'selectCondominio', component: SelectCondominioComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class PublicRoutingModule {

}