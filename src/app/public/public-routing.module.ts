import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PublicComponent } from "./public.component";
import { HomeComponent } from "./home/containers/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';




const routes: Routes = [
    {path: '', component: PublicComponent, children:
        [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class PublicRoutingModule {

}