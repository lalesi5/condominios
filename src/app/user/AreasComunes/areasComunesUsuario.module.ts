import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { ReactiveFormsModule } from "@angular/forms";

import { GridModule } from "@syncfusion/ej2-angular-grids";
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

import { AreasComunesUsuarioRoutingModule } from "./areasComunesUsuario-routing.module";
import { UserModule } from "../user.module";
import { ListarAreasComunalesUserComponent } from "./listar-areas-comunales/listar-areas-comunales.component";
import { MisReservasComponent } from "./mis-reservas/mis-reservas.component";
import { ReservasComponent } from "./reservas/reservas.component";
import { ReservasCreateComponent } from "./reservas-create/reservas-create.component";
import { ListaReservasComponent } from './lista-reservas/lista-reservas.component';


@NgModule({
  imports: [
    AreasComunesUsuarioRoutingModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    GridModule,
    DateTimePickerModule,
    MatButtonToggleModule,
    UserModule
  ],
  declarations: [
    ListarAreasComunalesUserComponent,
    MisReservasComponent,
    ReservasComponent,
    ReservasCreateComponent,
    ListaReservasComponent
  ],
  exports: [
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    CommonModule
  ]
})

export class AreasComunesUsuariosModule {
  constructor() {

  }
}
