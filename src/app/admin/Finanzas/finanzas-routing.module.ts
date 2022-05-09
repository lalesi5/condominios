import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EgresosFinanzasComponent} from "./egresosFinanzas/egresosFinanzas.component";
import {FinanzasComponent} from './finanzas.component';
import {IngresosFinanzasComponent} from "./ingresosFinanzas/ingresosFinanzas.component";
import {
  IngresosExtraordinariosFinanzasComponent
} from './ingresosExtraordinariosFinanzas/ingresosExtraordinariosFinanzas.component';
import {RegistroMensualidadComponent} from "./registro-mensualidad/registro-mensualidad.component";
import {CrearPagoMensualidadComponent} from "./crear-pago-mensualidad/crear-pago-mensualidad.component";
import {
  RegistrarExtraordinariosFinanzasComponent
} from "./registrar-extraordinarios-finanzas/registrar-extraordinarios-finanzas.component";
import {RegistrarEgresoComponent} from "./registrar-egreso/registrar-egreso.component";


const routesFinanzas: Routes = [
  {
    path: '', component: FinanzasComponent, children:
      [
        {path: '', redirectTo: 'ingresosFinanzas', pathMatch: 'full'},
        {path: 'ingresosFinanzas', component: IngresosFinanzasComponent},
        {path: 'egresosFinanzas', component: EgresosFinanzasComponent},
        {path: 'ingresosExtraordinarios', component: IngresosExtraordinariosFinanzasComponent},
        {path: 'registrarMensualidad', component: RegistroMensualidadComponent},
        {path: 'crearPagoMensualidad', component: CrearPagoMensualidadComponent},
        {path: 'registroExtraordinarios', component: RegistrarExtraordinariosFinanzasComponent},
        {path: 'registroEgresos', component: RegistrarEgresoComponent}
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesFinanzas)],
  exports: [RouterModule]

})

export class FinanzasRoutingModule {

}
