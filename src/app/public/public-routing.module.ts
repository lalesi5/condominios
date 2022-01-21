import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PublicComponent } from "./public.component";
import { HomeComponent } from "./home/containers/home.component";


import { LoginAdminComponent } from './loginAdmin/loginAdmin.component';
import { RegisterAdminComponent } from './registerAdmin/registerAdmin.component';




const routes: Routes = [
    {path: '', component: PublicComponent, children:
        [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'login', component: LoginAdminComponent},
            {path: 'register', component: RegisterAdminComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class PublicRoutingModule {

}