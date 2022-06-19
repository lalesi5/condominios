import {NgModule} from '@angular/core';
import {ReportesRoutingModule} from './reportes-routing.module';

import {BalanceComponent} from './balance/balance.component';
import {EgresosReportesComponent} from './egresos/egresosReportes.component';
import {IngresosReportesComponent} from './ingresos/ingresosReportes.component';


import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {GridModule} from "@syncfusion/ej2-angular-grids";
import {CommonModule} from "@angular/common";
import {CuentasComponent} from './cuentas/cuentas.component';
import { TablaCobranzasComponent } from './tabla-cobranzas/tabla-cobranzas.component';
import { CuentasFechaComponent } from './cuentas-fecha/cuentas-fecha.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  CalendarModule,
  DatePickerModule,
  DateRangePickerModule,
  DateTimePickerModule
} from "@syncfusion/ej2-angular-calendars";
import { CuentasSelectedComponent } from './cuentas-selected/cuentas-selected.component';

@NgModule({

  imports: [
    ReportesRoutingModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    GridModule,
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    DateTimePickerModule,
    DatePickerModule,
    CalendarModule,
    DateRangePickerModule
  ],
  declarations: [
    BalanceComponent,
    EgresosReportesComponent,
    IngresosReportesComponent,
    CuentasComponent,
    TablaCobranzasComponent,
    CuentasFechaComponent,
    CuentasSelectedComponent
  ],
  exports: [],
  providers: []
})
export class ReportesModule {

  constructor() {

  }

}
