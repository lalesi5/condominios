import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";
import {UnidadesService} from "../../../services/unidades.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {ReservasService} from "../../../services/reservas.service";

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
  numeroUnidad: string = '';
  loading = false;
  areaComunal: any[] = [];
  unidades: any[] = [];
  unidad: any[] = [];

  reservaForm: FormGroup;

  NavigationExtras: NavigationExtras = {
    state: {}
  }

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
    this.recoverData();
  }

  ngOnInit(): void {
    this.getDatosUnidades();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAdministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.areaComunal = navigations;
    this.idAreaComunal = navigations.idAreaComunal;
    this.NavigationExtras.state = this.areaComunal;
  }

  getDatosUnidades() {
    this.subscription.add(
      this._unidadesService.getAllUnidades(this.idCondominio).subscribe(data => {
        data.forEach((element: any) => {
          this.unidades.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onCreateReserva(){
    const descripcionArea = String(this.reservaForm.value.detalleReserva).charAt(0).toLocaleUpperCase() + String(this.reservaForm.value.detalleReserva).slice(1);
    const date = this.reservaForm.value.fechaReservaInicio;

    this._dialogService.confirmDialog({
      title: 'Agregar reserva',
      message: '¿Está seguro de agregar la reserva?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe( res => {
      if (res) {

      this.getUnidadID(this.reservaForm.value.idUnidad);

      this.unidad.map( data => {
        this.numeroUnidad = data.numeroUnidad
        console.log(this.numeroUnidad);
      })

        const reserva: any = {
          fechaReservaInicio: date.toLocaleString(),
          fechaReservaFin: this.reservaForm.value.fechaReservaFin,
          estadoReserva: this.reservaForm.value.estadoReserva,
          idUnidad: this.reservaForm.value.idUnidad,
          idAdministrador: this.idAdministrador,
          idCondominio: this.idCondominio,
          idAreaComunal: this.idAreaComunal,
          detalleReserva: descripcionArea
        }

        this.loading = true;
        this._reservaService.agregarReserva(reserva).then(() => {
          this.toastr.success('La reserva fue creada con exito', 'Reserva registrada', {
            positionClass: 'toast-bottom-rigth'
          });
          this.loading = false;
          this.router.navigate(['/admin/administracion/reservas', this.idAreaComunal], this.NavigationExtras);
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
    this.router.navigate(['admin/administracion/reservas', this.idAreaComunal], this.NavigationExtras);
  }

}
