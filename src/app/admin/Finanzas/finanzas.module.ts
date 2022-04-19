import { NgModule } from '@angular/core';
import { FinanzasRoutingModule } from './finanzas-routing.module';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { EgresosFinanzasComponent } from './egresosFinanzas/egresosFinanzas.component';
import { IngresosExtraordinariosFinanzasComponent } from './ingresosExtraordinariosFinanzas/ingresosExtraordinariosFinanzas.component';
import { IngresosFinanzasComponent } from './ingresosFinanzas/ingresosFinanzas.component';
import {GridModule} from "@syncfusion/ej2-angular-grids";
import { RegistroMensualidadComponent } from './registro-mensualidad/registro-mensualidad.component';
import {CommonModule} from "@angular/common";
import { CrearPagoMensualidadComponent } from './crear-pago-mensualidad/crear-pago-mensualidad.component';

@NgModule({

    imports: [
        FinanzasRoutingModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        GridModule,
        CommonModule
    ],
    declarations: [
        EgresosFinanzasComponent,
        IngresosExtraordinariosFinanzasComponent,
        IngresosFinanzasComponent,
        RegistroMensualidadComponent,
        CrearPagoMensualidadComponent
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule
    ],
    providers: []
})
export class FinanzasModule {

    constructor() {

    }

}
