import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MensajesService} from "../../services/mensajes.service";

@Component({
  selector: 'app-comunicacionUsuario',
  templateUrl: './comunicacionUsuario.component.html',
  styleUrls: ['./comunicacionUsuario.component.css']
})

export class ComunicacionUsuarioComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idUsuario: string = '';
  idUnidad: string = '';
  nombreResidente: string = '';
  apellidoResidente: string = '';
  nombreUsuario: string = '';
  mensajes: any[] = [];

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
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    this.nombreResidente = <string>sessionStorage.getItem('nombreResidente');
    this.apellidoResidente = <string>sessionStorage.getItem('apellidoResidente');
    this.nombreUsuario = this.nombreResidente + ' ' + this.apellidoResidente;

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
    this.router.navigate(['/user/responder']);
  }

}
