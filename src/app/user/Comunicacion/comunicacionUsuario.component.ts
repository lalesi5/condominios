import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MensajesService } from "../../services/mensajes.service";

@Component({
  selector: 'app-comunicacionUsuario',
  templateUrl: './comunicacionUsuario.component.html',
  styleUrls: ['./comunicacionUsuario.component.css']
})

export class ComunicacionUsuarioComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idUsuario: string = '';
  idUnidad: string = '';
  nombreUsuario: string = '';
  mensajes: any[] = [];
  unidad: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _mensajesService: MensajesService,
  ) {
    this.recoverData();
  }

  ngOnInit() {
    this.getMensajes();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idUsuario = navigations.idUsuario;
    this.idUnidad = navigations.idUnidad;
    this.unidad = navigations;
    this.nombreUsuario = navigations.nombreResidente + ' ' + navigations.apellidoResidente;
    this.NavigationExtras.state = this.unidad;
  }

  getMensajes() {
    this.subscription.add(
      this._mensajesService
        .getMensajes(this.idUsuario, this.idUnidad)
        .subscribe(data => {
          this.mensajes = [];
          data.forEach((element: any) => {
            this.mensajes.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            })
          })
        })
    )
  }

  onAnswer() {
    this.router.navigate(['/user/responder'], this.NavigationExtras);
  }

}
