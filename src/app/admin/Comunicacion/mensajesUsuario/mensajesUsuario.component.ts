import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { DialogService } from "src/app/services/dialog.service";
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
  nombreUsuario: string = '';
  mensajes: any[] = [];
  condominio: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _mensajesService: MensajesService,
    private _dialogService: DialogService,
    private toastr: ToastrService
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
    this.nombreUsuario = navigations.nombreResidente + ' ' + navigations.apellidoResidente;
    this.condominio = navigations;
    this.NavigationExtras.state = this.condominio;
  }

  getMensajes() {
    this.subscription.add(
      this._mensajesService
        .getMensajes(this.idUsuario)
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

  onGoEdit(item: any) {
    this.NavigationExtras.state = item;
    this.router.navigate(['/admin/comunicacion/editarMensaje', item.idMensaje], this.NavigationExtras);
  }

  onBackToUnits() {
    this.router.navigate(['/admin/comunicacion/individuales'], this.NavigationExtras);
  }

}
