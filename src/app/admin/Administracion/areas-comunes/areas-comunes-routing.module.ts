import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AreasComunesComponent } from './areas-comunes.component';
import { ListarAreasComunesComponent } from './listar-areas-comunes/listar-areas-comunes.component';
import { ReservasPendientesComponent } from './reservas-pendientes/reservas-pendientes.component';
import { AreasComunesEditComponent } from './areas-comunes-edit/areas-comunes-edit.component';
import { AreasComunesCreateComponent } from './areas-comunes-create/areas-comunes-create.component';
import { ReservasEditComponent } from './reservas-edit/reservas-edit.component';
import { ReservasCreateComponent } from './reservas-create/reservas-create.component';
import { ReservasTotalesComponent } from './reservas-totales/reservas-totales.component';

const routerAdministracion: Routes = [
  {
    path: '', component: AreasComunesComponent, children:
      [
        { path: '', redirectTo: 'listarAreasComunes', pathMatch: 'full' },
        { path: 'listarAreasComunes', component: ListarAreasComunesComponent },
        { path: 'areasComunesEdit', component: AreasComunesEditComponent },
        { path: 'areasComunesCreate', component: AreasComunesCreateComponent },
        { path: 'reservasPendientes', component: ReservasPendientesComponent },
        { path: 'reservasEdit', component: ReservasEditComponent },
        { path: 'reservasCreate', component: ReservasCreateComponent },
        { path: 'reservasTotales', component: ReservasTotalesComponent }
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routerAdministracion), CommonModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AreasComunesRoutingModule { }
