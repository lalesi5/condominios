import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing.module';

import {SharedModule} from '../core/shared/shared.module';
import {AdminComponent} from './admin.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {TopBarComponent} from './components/topbar/topbar.component';
import {InicioComponent} from './Inicio/inicio.component';
import {AdministracionComponent} from './Administracion/administracion.component';
import {AjustesComponent} from './Ajustes/ajustes.component';
import {ComunicacionComponent} from './Comunicacion/comunicacion.component';
import {ReportesComponent} from './Reportes/reportes.component';
import {FinanzasComponent} from './Finanzas/finanzas.component';

import {MatCardModule} from '@angular/material/card';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {GridModule} from '@syncfusion/ej2-angular-grids';
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({

  imports: [
    AdminRoutingModule,
    SharedModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    GridModule,
    MatToolbarModule
  ],
  declarations: [
    AdminComponent,
    TopBarComponent,
    NavigationComponent,
    InicioComponent,
    AdministracionComponent,
    ComunicacionComponent,
    ReportesComponent,
    FinanzasComponent,
    AjustesComponent
  ],
  exports: [
    MatCardModule,
    CommonModule,
    TopBarComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})

export class AdminModule {
}
