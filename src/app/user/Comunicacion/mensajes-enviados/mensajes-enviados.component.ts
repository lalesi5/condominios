import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-mensajes-enviados',
  templateUrl: './mensajes-enviados.component.html',
  styleUrls: ['./mensajes-enviados.component.css']
})
export class MensajesEnviadosComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idUsuario: string = '';
  idUnidad: string = '';
  status: string = '';
  nombreResidente: string = '';
  apellidoResidente: string = '';
  nombreUsuario: string = '';
  mensajes: any[] = [];
  toggle = true;
  element = false;

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
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    this.nombreResidente = <string>sessionStorage.getItem('nombreResidente');
    this.apellidoResidente = <string>sessionStorage.getItem('apellidoResidente');
    this.nombreUsuario = this.nombreResidente + ' ' + this.apellidoResidente;
  }

  getMensajes() {
    this.subscription.add(
      this._mensajesService
        .getMensajesUser(this.idUsuario, this.idUnidad)
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

  visualizarMensaje(id: string) {
    this.toggle = !this.toggle;
    if (this.toggle == true) {
      this.status = 'No Visto';
      const data = { visto: 'No Visto' }
      this._mensajesService.updateMensajes(id, data)
    } else {
      this.status = 'Visto';
      const data = { visto: 'Visto' }
      this.toggle = false;
      this._mensajesService.updateMensajes(id, data)
    }
    //this.status = this.toggle ? 'No Leído' : 'Leído';
  }

  onAnswer() {
    this.router.navigate(['/user/responder']);
  }
}
