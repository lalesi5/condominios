import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MensajesService } from '../../../services/mensajes.service';

@Component({
  selector: 'app-mensajesUsuario',
  templateUrl: './mensajesUsuario.component.html',
  styleUrls: ['./mensajesUsuario.component.css']
})

export class MensajeUsuarioComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idUnidad: string = '';
  idUsuario: string = '';
  mensajes: any[] = [];
  condominio: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _mensajesService: MensajesService
  ) {
    this.recoverData();
  }

  ngOnInit() {
    this.getMensajes();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.idUnidad = navigations.idUnidad;
    this.idUsuario = navigations.idUsuario;
    this.condominio = navigations;
    this.NavigationExtras.state = this.condominio;
  }

  getMensajes() {
    this.subscription.add(
      this._mensajesService
        .getMensajes(this.idUsuario)
        .subscribe(data => {
          data.forEach((element: any) => {
            this.mensajes.push({
              ...element.payload.doc.data()
            })
          })
        })
    )
  }

  onBackToUnits() {
    this.router.navigate(['/admin/comunicacion/individuales'], this.NavigationExtras);
  }

}
