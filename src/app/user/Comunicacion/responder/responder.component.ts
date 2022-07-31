import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavigationExtras, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {DialogService} from "src/app/services/dialog.service";
import {MensajesService} from "../../../services/mensajes.service";

@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.css']
})
export class ResponderComponent implements OnInit {

  idAdministrador: string = '';
  idCondominio: string = '';
  idUsuario: string = '';
  idUnidad: string = '';
  nombreResidente: string = '';
  apellidoResidente: string = '';
  nombreUsuario: string = '';
  mensajes: any[] = [];

  loading = false;

  mensajesForm: FormGroup;

  constructor(
    private router: Router,
    private _mensajesService: MensajesService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {

    this.mensajesForm = this.fb.group({
      tituloMensaje: ['', Validators.required],
      descripcionMensaje: ['', Validators.required],
    })
    this.recoverData();
  }

  ngOnInit() { }

  recoverData() {
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    this.nombreResidente = <string>sessionStorage.getItem('nombreResidente');
    this.apellidoResidente = <string>sessionStorage.getItem('apellidoResidente');
    this.nombreUsuario = this.nombreResidente + ' ' + this.apellidoResidente;

  }

  volver() {
    this.router.navigate(['/user/comunicacion']);
  }

  onCreateMensaje() {

    const titulo = String(this.mensajesForm.value.tituloMensaje).charAt(0).toLocaleUpperCase() + String(this.mensajesForm.value.tituloMensaje).slice(1);
    var date = new Date();

    this._dialogService.confirmDialog({
      title: 'Enviar mensaje',
      message: '¿Está seguro de enviar el mensaje?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        const mensaje: any = {
          descripcionMensaje: this.mensajesForm.value.descripcionMensaje,
          fechaMensaje: date.toLocaleString(),
          idAdministrador: this.idAdministrador,
          idCondominio: this.idCondominio,
          tituloMensaje: titulo,
          idUsuario: this.idUsuario,
          estado: 'Activo',
          visto: 'No Visto',
          escritoPor: this.nombreUsuario,
          idUnidad: this.idUnidad
        }
        
        //Crea el documento
        this.loading = true;
        this._mensajesService.guardarMensaje(mensaje).then(() => {

          this.toastr.success('El mensaeje fue enviado con exito', 'Mensaje Enviado', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.router.navigate(['/user/comunicacion']);

        }).catch(error => {
          console.log(error);
          this.loading = false;
        });
      }
    });
  }

}

