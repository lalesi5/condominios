import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ReactiveFormsModule } from "@angular/forms";

import { GridModule } from "@syncfusion/ej2-angular-grids";
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";

import { ListarAreasComunesComponent } from './listar-areas-comunes/listar-areas-comunes.component';
import { ReservasPendientesComponent } from './reservas-pendientes/reservas-pendientes.component';
import { AreasComunesRoutingModule } from './areas-comunes-routing.module';
import { ReservasTotalesComponent } from './reservas-totales/reservas-totales.component';
import { AreasComunesEditComponent } from './areas-comunes-edit/areas-comunes-edit.component';
import { AreasComunesCreateComponent } from './areas-comunes-create/areas-comunes-create.component';
import { ReservasCreateComponent } from './reservas-create/reservas-create.component';
import { ReservasEditComponent } from './reservas-edit/reservas-edit.component';

@NgModule({
  imports: [
    AreasComunesRoutingModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    GridModule,
    DateTimePickerModule,
    MatButtonToggleModule
  ],
  declarations: [
    ListarAreasComunesComponent,
    ReservasPendientesComponent,
    ReservasTotalesComponent,
    AreasComunesEditComponent,
    AreasComunesCreateComponent,
    ReservasCreateComponent,
    ReservasEditComponent
  ],
  exports: [
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    MatButtonToggleModule
  ]
})
export class AreasComunesModule { }
