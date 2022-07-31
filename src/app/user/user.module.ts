import {NgModule} from '@angular/core';
import {UsuarioRoutingModule} from './user-routing.module';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';

import {InicioUsuarioComponent} from './inicio/inicioUsuario.component';
import {UserAnunciosComponent} from './Anuncios/userAnuncios.component';
import {UserComponent} from './user.component';
import {NavigationUserComponent} from './components/navigation/navigationUser.component';
import {TopBarUserComponent} from './components/topbar/topbarUser.component';
import {ComunicacionUsuarioComponent} from './Comunicacion/comunicacionUsuario.component';
import {AjustesUsuarioComponent} from './Ajustes/ajustesUsuario.component';
import {AreasComunesUsuarioComponent} from './AreasComunes/areasComunesUsuario.component';
import {FinanzasUsuarioComponent} from './Finanzas/finanzasUsuario.component';
import {ResponderComponent} from './Comunicacion/responder/responder.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AjustesUserEditComponent} from './Ajustes/ajustes-user-edit/ajustes-user-edit.component';
import {DateTimePickerModule} from "@syncfusion/ej2-angular-calendars";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {GridModule} from "@syncfusion/ej2-angular-grids";
import { MensajesEnviadosComponent } from './Comunicacion/mensajes-enviados/mensajes-enviados.component';


@NgModule({

  imports: [
    UsuarioRoutingModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    DateTimePickerModule,
    MatButtonToggleModule,
    GridModule,
  ],
  declarations: [
    UserComponent,
    UserAnunciosComponent,
    NavigationUserComponent,
    InicioUsuarioComponent,
    TopBarUserComponent,
    ComunicacionUsuarioComponent,
    AjustesUsuarioComponent,
    AreasComunesUsuarioComponent,
    FinanzasUsuarioComponent,
    ResponderComponent,
    AjustesUserEditComponent,
    MensajesEnviadosComponent,
  ],
  exports: [
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    TopBarUserComponent,
    MatButtonToggleModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})

export class UserModule {
}
