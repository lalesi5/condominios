import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "src/app/services/dialog.service";
import { MensajesService } from "../../../services/mensajes.service";

@Component({
  selector: 'app-nuevoMensaje',
  templateUrl: './nuevoMensaje.component.html',
  styleUrls: ['./nuevoMensaje.component.css']
})

export class NuevoMensajeComponent implements OnInit {

  idAdministrador: string = '';
  idCondominio: string = '';
  idUsuario: string = '';
  mensajes: any[] = [];
  condominio: any[] = [];

  loading = false;

  mensajesForm: FormGroup;

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _mensajesService: MensajesService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {

    this.mensajesForm = this.fb.group({
      tituloMensaje: ['', Validators.required],
      descripcionMensaje: [''],
    })

    this.recoverData();
  }

  ngOnInit() { }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAdministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.idUsuario = navigations.idUsuario;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  onBacktoList() {
    this.router.navigate(['/admin/comunicacion/individuales'], this.navigationExtras);
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
          idUsuario: this.idUsuario
        }
        //Crea el documento
        this.loading = true;
        this._mensajesService.guardarMensaje(mensaje).then(() => {

          this.toastr.success('El mensaeje fue enviado con exito', 'Mensaje Enviado', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.navigationExtras.state = this.condominio;
          this.router.navigate(['/admin/comunicacion/individuales'], this.navigationExtras);

        }).catch(error => {
          console.log(error);
          this.loading = false;
        });
      }
    });
  }

}

