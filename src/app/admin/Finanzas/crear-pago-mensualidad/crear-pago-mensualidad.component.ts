import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { Subscription } from 'rxjs';
import {UnidadesService} from "../../../services/unidades.service";
import {CuentasService} from "../../../services/cuentas.service";
import {ReservasService} from "../../../services/reservas.service";
import {TiposPagoService} from "../../../services/tiposPago.service";
import {DescuentosService} from "../../../services/descuentos.service";


@Component({
  selector: 'app-crear-pago-mensualidad',
  templateUrl: './crear-pago-mensualidad.component.html',
  styleUrls: ['./crear-pago-mensualidad.component.css']
})
export class CrearPagoMensualidadComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAdministrador: string = '';
  idCondominio: string = '';
  idUnidad: string = '';
  loading = false;
  sumaValorReservas: number = 0;

  unidades: any[] = [];
  cuentasPago: any[] = [];
  reservas: any[] = [];
  tiposPago: any[] = [];
  descuentos: any[] = [];

  pagoMensualidadForm: FormGroup;
  datosUnidadForm: FormGroup;
  cuentasPagoForm: FormGroup;
  tiposPagoForm: FormGroup;
  descuentosForm: FormGroup;

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private _reservasService: ReservasService,
    private _cuentaPagoService: CuentasService,
    private _tipoPagoService: TiposPagoService,
    private _descuentoService: DescuentosService,
    private fb: FormBuilder,
  ) {
    this.pagoMensualidadForm = this.fb.group({
      fechaMensualidad: ['', Validators.required],
      idUnidad: ['', Validators.required],
      idCuenta: ['', Validators.required],
      idAreaComunal: ['', Validators.required],
      idTiposPago: ['', Validators.required],
      idDescuento: ['', Validators.required],
    });

    this.datosUnidadForm = this.fb.group({
      cuotaUnidad: [''],
      unidad: [''],
      nombreResidente: [''],
      apellidoResidente: [''],
      sumaValorReservas: ['']
    });

    this.cuentasPagoForm = this.fb.group({
      nombreCuenta: [''],
      tipoCuenta: ['']
    });

    this.tiposPagoForm = this.fb.group({
      tiposPago: [''],
      detalleTiposPago: ['']
    });

    this.descuentosForm = this.fb.group({
      nombreDescuento: [''],
      valorDescuento: ['']
    });

    this.recoverData()
  }

  ngOnInit(): void {
    this.getDatoUnidad();
    this.getCuentaPago();
    this.getValoresReservas();
    this.getTiposPago();
    this.getDescuentos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
  }

  getDatoUnidad() {
    this.subscription.add(
      this._unidadesService.getUnidadesById(this.idUnidad).subscribe(data => {
        this.unidades = [];
        data.forEach((element: any) => {
          this.unidades.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  getCuentaPago(){
    this.subscription.add(
      this._cuentaPagoService.getCuentas(this.idCondominio).subscribe(data => {
        this.cuentasPago = [];
        data.forEach((element: any) => {
          this.cuentasPago.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  getTiposPago(){
    this.subscription.add(
      this._tipoPagoService.getTiposPago(this.idCondominio).subscribe(data => {
        this.tiposPago = [];
        data.forEach((element: any) => {
          this.tiposPago.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  getDescuentos(){
    this.subscription.add(
      this._descuentoService.getDescuentos(this.idCondominio).subscribe( data => {
        this.descuentos = [];
        data.forEach((element: any) => {
          this.descuentos.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  getValoresReservas() {
    this.subscription.add(
      this._reservasService.getReservasValorPago(this.idUnidad).subscribe(data => {
        this.reservas = [];
        data.forEach((element: any) => {
          this.reservas.push({
            ...element.payload.doc.data()
          })
        })
        //suma todos los valores de reservas que pertenecen a esa unidad y que tienen pagoReserva = Por Pagar
        this.reservas.map(data => {
          this.sumaValorReservas += data.valorReserva;
        })
      })
    )
  }

  onUnitChanged(item: any) {
    this.subscription.add(
      this._unidadesService.getUnidad(item).subscribe(data => {
        this.loading = false;
        this.datosUnidadForm.setValue({
          cuotaUnidad: data.payload.data()['cuotaUnidad'],
          unidad: data.payload.data()['unidad'],
          nombreResidente: data.payload.data()['nombreResidente'],
          apellidoResidente: data.payload.data()['apellidoResidente'],
          sumaValorReservas: this.sumaValorReservas
        })
      })
    )
  }

  onCuentaPagoChanged(item: any){
    this.subscription.add(
      this._cuentaPagoService.getCuenta(item).subscribe(data => {
        this.loading = false;
        this.cuentasPagoForm.setValue({
          nombreCuenta: data.payload.data()['nombreCuenta'],
          tipoCuenta: data.payload.data()['tipoCuenta']
        })
      })
    )
  }

  onTipoPagoChanged(item: any){
    this.subscription.add(
      this._tipoPagoService.getTipoPago(item).subscribe(data => {
        this.loading = false;
        this.tiposPagoForm.setValue({
          tiposPago: data.payload.data()['tiposPago'],
          detalleTiposPago: data.payload.data()['detalleTiposPago']
        })
      })
    )
  }

  onDescuentoChanged(item: any){
    this.subscription.add(
      this._descuentoService.getDescuento(item).subscribe(data=> {
        this.loading = false;
        this.descuentosForm.setValue({
          nombreDescuento: data.payload.data()['nombreDescuento'],
          valorDescuento: data.payload.data()['valorDescuento']
        })
      })
    )
  }

  onBacktoList(): void {
    this.router.navigate(['admin/finanzas//registrarMensualidad']);
  }

}
