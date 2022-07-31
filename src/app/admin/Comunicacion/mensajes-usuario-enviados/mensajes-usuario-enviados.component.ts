import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'app-mensajes-usuario-enviados',
  templateUrl: './mensajes-usuario-enviados.component.html',
  styleUrls: ['./mensajes-usuario-enviados.component.css']
})
export class MensajesUsuarioEnviadosComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  idUnidad: string = '';
  idUsuario: string = '';
  nombreResidente: string = '';
  apellidoResidente: string = '';
  nombreUsuario: string = '';
  mensajes: any[] = [];
  unidad: any[] = [];
  toggle = true;
  status: string = '';

  constructor(
    private router: Router,
    private _mensajesService: MensajesService,
    private _unidadesService: UnidadesService,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.recoverData();
  }

  ngOnInit() {
    this.getMensajes();
    this.getUnidad();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
    this.nombreResidente = <string>sessionStorage.getItem('nombreResidente');
    this.apellidoResidente = <string>sessionStorage.getItem('apellidoResidente');
    this.nombreUsuario = this.nombreResidente + ' ' + this.apellidoResidente;
  }

  getUnidad() {
    this.subscription.add(
      this._unidadesService
        .getUnidadesById(this.idUnidad)
        .subscribe(data => {
          this.unidad = [];
          data.forEach((element: any) => {
            this.unidad.push({
              ...element.payload.doc.data()
            })
          })
        })
    )
  }

  getMensajes() {
    this.subscription.add(
      this._mensajesService
        .getMensajesAdmin(this.idUsuario, this.idUnidad)
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

  onDelete(id: string) {
    this._dialogService.confirmDialog({
      title: 'Eliminar mensaje',
      message: '¿Está seguro de eliminar el mensaje?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this._mensajesService.eliminarMensaje(id).then(() => {
          this.toastr.success('El mensaje fue eliminado con exito', 'Mensaje eliminado', {
            positionClass: 'toast-bottom-right'
          });
        }).catch(error => {
          console.log(error);
        })
      }
    });
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
  }

  onGoEdit(item: any) {
    sessionStorage.setItem('idMensaje', <string>item.idMensaje);
    this.router.navigate(['/admin/comunicacion/editarMensaje']);
  }

  onBackToUnits() {
    this.router.navigate(['/admin/comunicacion/individuales']);
  }

}
