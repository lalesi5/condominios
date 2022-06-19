import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {DialogService} from 'src/app/services/dialog.service';
import {MensajesService} from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-editar-mensaje',
  templateUrl: './editar-mensaje.component.html',
  styleUrls: ['./editar-mensaje.component.css']
})
export class EditarMensajeComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;

  idCondominio: string = '';
  idUsuario: string = '';
  idMensaje: string = '';
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

  ngOnInit(): void {
    this.getDatosMensaje();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idMensaje = <string>sessionStorage.getItem('idMensaje');
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
  }

  getDatosMensaje() {
    if (this.idMensaje !== null) {
      this.loading = true;
      this.subscription.add(
        this._mensajesService.getMensaje(this.idMensaje).subscribe(data => {
          this.loading = false;
          this.mensajesForm.setValue({
            tituloMensaje: data.payload.data()['tituloMensaje'],
            descripcionMensaje: data.payload.data()['descripcionMensaje'],
          })
        })
      )
    }
  }

  onEditMensaje() {
    const titulo = String(this.mensajesForm.value.tituloMensaje).charAt(0).toLocaleUpperCase() + String(this.mensajesForm.value.tituloMensaje).slice(1);
    var date = new Date();
    const idUMensaje = this.idMensaje;

    this._dialogService.confirmDialog({
      title: 'Modificar mensaje',
      message: '¿Está seguro de modificar la información?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        const mensaje: any = {
          descripcionMensaje: this.mensajesForm.value.descripcionMensaje,
          fechaMensaje: date.toLocaleString(),
          tituloMensaje: titulo,
          estado: 'Activo'
        }
        //Crea el documento
        this.loading = true;
        this._mensajesService.updateMensajes(idUMensaje!, mensaje).then(() => {

          this.toastr.success('El la información fue modificada con exito', 'Informción modificada', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.router.navigate(['/admin/comunicacion/mensajeUsuario']);

        }).catch(error => {
          console.log(error);
          this.loading = false;
        });
      }
    });
  }

  onBacktoList() {
    this.router.navigate(['/admin/comunicacion/mensajeUsuario']);
  }

}
