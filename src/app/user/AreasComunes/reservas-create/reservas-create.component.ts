import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ReservasService} from "../../../services/reservas.service";
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {AreasComunalesService} from "../../../services/areasComunales.service";

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
  idUnidad: string = '';
  pagoReserva: string = '';
  valorReserva: string = '';
  area: any[] = [];

  nombreAreaComunal: string = '';
  unidad: string = '';
  nombreResidente: string = '';
  apellidoResidente: string = '';

  loading = false;

  reservaForm: FormGroup;

  constructor(
    private router: Router,
    private _reservaService: ReservasService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private _areaComunalService: AreasComunalesService
  ) {
    this.reservaForm = this.fb.group({
      fechaReservaInicio: ['', Validators.required],
      fechaReservaFin: ['', Validators.required],
      detalleReserva: ['', Validators.required],
    });

    this.recoverData();
  }

  ngOnInit(): void {
    this.ongetArea();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idAreaComunal = <string>sessionStorage.getItem('idAreaComunal');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    this.nombreAreaComunal = <string>sessionStorage.getItem('nombreAreaComunal');
    this.unidad = <string>sessionStorage.getItem('unidad');
    this.nombreResidente = <string>sessionStorage.getItem('nombreResidente');
    this.apellidoResidente = <string>sessionStorage.getItem('apellidoResidente');
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.pagoReserva = 'Por Pagar';
    //console.log(sessionStorage);
  }

  ongetArea() {
    this.subscription.add(
      this._areaComunalService.getArea(this.idAreaComunal).subscribe(data => {
        this.valorReserva = data.payload.data()['valorReserva'];
      })
    )
  }

  onCreateReserva() {
    const descripcionArea = String(this.reservaForm.value.detalleReserva).charAt(0).toLocaleUpperCase() + String(this.reservaForm.value.detalleReserva).slice(1);
    const date = this.reservaForm.value.fechaReservaInicio;
    const date2 = this.reservaForm.value.fechaReservaFin;

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
          estadoReserva: 'Pendiente',
          idUnidad: this.idUnidad,
          unidad: this.unidad,
          nombreResidente: this.nombreResidente,
          apellidoResidente: this.apellidoResidente,
          idAdministrador: this.idAdministrador,
          idCondominio: this.idCondominio,
          idAreaComunal: this.idAreaComunal,
          nombreAreaComunal: this.nombreAreaComunal,
          detalleReserva: descripcionArea,
          pagoReserva: this.pagoReserva,
          valorReserva: this.valorReserva,

        }

        this.loading = true;
        this._reservaService.agregarReserva(reserva).then(() => {
          this.toastr.success('La reserva fue creada con exito', 'Reserva registrada', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.router.navigate(['/user/areasComunes/listarAreas']);
        }).catch(error => {
          console.log(error);
        })
      }
    })
  }

  onBacktoList(): void {
    this.router.navigate(['/user/areasComunes/listarAreas']);
  }
}
