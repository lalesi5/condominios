import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'app-reservas-create',
  templateUrl: './reservas-create.component.html',
  styleUrls: ['./reservas-create.component.css']
})
export class ReservasCreateComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAdministrador: string = '';
  idCondominio: string = '';
  idAreaComunal: string = '';
  nombreAreaComunal: string = '';
  numeroUnidad: string = '';
  loading = false;
  areaComunal: any[] = [];
  unidades: any[] = [];
  unidad: any[] = [];

  reservaForm: FormGroup;
  datosUnidadForm: FormGroup;

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private _reservaService: ReservasService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.reservaForm = this.fb.group({
      fechaReservaInicio: ['', Validators.required],
      fechaReservaFin: ['', Validators.required],
      detalleReserva: ['', Validators.required],
      estadoReserva: ['', Validators.required],
      idUnidad: ['', Validators.required],
    });

    this.datosUnidadForm = this.fb.group({
      nombreResidente: [''],
      apellidoResidente: [''],
      unidad: ['']
    })
    this.recoverData();
  }

  ngOnInit(): void {
    this.getDatosUnidades();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idAreaComunal = <string>sessionStorage.getItem('idAreaComunal');
    this.nombreAreaComunal = <string>sessionStorage.getItem('nombreAreaComunal');
  }

  getDatosUnidades() {
    this.subscription.add(
      this._unidadesService.getAllUnidades(this.idCondominio).subscribe(data => {
        this.unidades = [];
        data.forEach((element: any) => {
          this.unidades.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onUnitChanged(item: any) {
    this.subscription.add(
      this._unidadesService.getUnidad(item).subscribe(data => {
        this.loading = false;
        this.datosUnidadForm.setValue({
          nombreResidente: data.payload.data()['nombreResidente'],
          apellidoResidente: data.payload.data()['apellidoResidente'],
          unidad: data.payload.data()['unidad']
        })
      })
    )
  }

  onCreateReserva() {
    const descripcionArea = String(this.reservaForm.value.detalleReserva).charAt(0).toLocaleUpperCase() + String(this.reservaForm.value.detalleReserva).slice(1);
    const date = this.reservaForm.value.fechaReservaInicio;
    const date2 = this.reservaForm.value.fechaReservaFin;
    const idUnidad = this.reservaForm.value.idUnidad;

    this._dialogService.confirmDialog({
      title: 'Agregar reserva',
      message: '¿Está seguro de agregar la reserva?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {

        const reserva: any = {
          fechaReservaInicio: date.toLocaleString(),
          fechaReservaFin: date2.toLocaleString(),
          estadoReserva: this.reservaForm.value.estadoReserva,
          idUnidad: idUnidad,
          unidad: this.datosUnidadForm.value.unidad,
          nombreResidente: this.datosUnidadForm.value.nombreResidente,
          apellidoResidente: this.datosUnidadForm.value.apellidoResidente,
          idAdministrador: this.idAdministrador,
          idCondominio: this.idCondominio,
          idAreaComunal: this.idAreaComunal,
          nombreAreaComunal: this.nombreAreaComunal,
          detalleReserva: descripcionArea
        }

        this.loading = true;
        this._reservaService.agregarReserva(reserva).then(() => {
          this.toastr.success('La reserva fue creada con exito', 'Reserva registrada', {
            positionClass: 'toast-bottom-rigth'
          });
          this.loading = false;
          this.router.navigate(['/admin/administracion/areasComunes/reservasPendientes']);
        }).catch(error => {
          console.log(error);
        })
      }
    })
  }

  getUnidadID(idUser: string) {
    this.subscription.add(
      this._unidadesService.getUnidadesById(idUser).subscribe(data => {
        this.unidad = [];
        data.forEach((element: any) => {
          this.unidad.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onBacktoList(): void {
    this.router.navigate(['admin/administracion/areasComunes/reservasPendientes']);
  }

}