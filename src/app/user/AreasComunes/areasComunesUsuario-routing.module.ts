import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {ReservasComponent} from "./reservas/reservas.component";
import {ReservasCreateComponent} from "./reservas-create/reservas-create.component";
import {MisReservasComponent} from "./mis-reservas/mis-reservas.component";
import {ListarAreasComunalesUserComponent} from "./listar-areas-comunales/listar-areas-comunales.component";
import { AreasComunesUsuarioComponent } from "./areasComunesUsuario.component";


const routesAreasComunesUsuario: Routes = [
  {
    path: '', component: AreasComunesUsuarioComponent,children:
    [
      {path: '', redirectTo: 'listarAreas', pathMatch: 'full'},
      {path: 'listarAreas',component: ListarAreasComunalesUserComponent },
      {path: 'reservas', component: ReservasComponent},
      {path: 'reservasCreate', component: ReservasCreateComponent},
      {path: 'misReservas', component: MisReservasComponent}
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routesAreasComunesUsuario), CommonModule, ReactiveFormsModule],
  exports: [RouterModule]
})

export class AreasComunesUsuarioRoutingModule {

}
