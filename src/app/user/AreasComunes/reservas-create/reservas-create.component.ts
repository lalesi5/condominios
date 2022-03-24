import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavigationExtras, Router} from "@angular/router";
import {ReservasService} from "../../../services/reservas.service";
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";

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
  nombreAreaComunal: string = '';
  nombreResidente: string = '';
  apellidoResidente: string = '';
  numeroUnidad: string = '';
  loading = false;
  areaComunal: any[] = [];

  reservaForm: FormGroup;

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _reservaService: ReservasService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.reservaForm = this.fb.group({
      fechaReservaInicio: ['', Validators.required],
      fechaReservaFin: ['', Validators.required],
      detalleReserva: ['', Validators.required],
    });
    this.recoverData();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAdministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.idUnidad = navigations.idUnidad;
    this.numeroUnidad = navigations.numeroUnidad;
    this.nombreAreaComunal = navigations.nombre;
    this.nombreResidente = navigations.nombreResidente;
    this.apellidoResidente = navigations.apellidoResidente;
    this.areaComunal = navigations;
    this.idAreaComunal = navigations.idAreaComunal;
    this.NavigationExtras.state = this.areaComunal;
  }

  onCreateReserva(){
    const descripcionArea = String(this.reservaForm.value.detalleReserva).charAt(0).toLocaleUpperCase() + String(this.reservaForm.value.detalleReserva).slice(1);
    const date = this.reservaForm.value.fechaReservaInicio;
    const date2 = this.reservaForm.value.fechaReservaFin;

    this._dialogService.confirmDialog({
      title: 'Agregar reserva',
      message: '¿Está seguro de agregar la reserva?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe( res => {
      if (res) {

        const reserva: any = {
          fechaReservaInicio: date.toLocaleString(),
          fechaReservaFin: date2.toLocaleString(),
          estadoReserva: 'Pendiente',
          idUnidad: this.idUnidad,
          numeroUnidad: this.numeroUnidad,
          nombreResidente: this.nombreResidente,
          apellidoResidente: this.apellidoResidente,
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
          this.router.navigate(['/user/reservas'], this.NavigationExtras);
        }).catch(error => {
          console.log(error);
        })
      }
    })
  }

  onBacktoList(): void {
    this.router.navigate(['user/reservas'], this.NavigationExtras);
  }

}
