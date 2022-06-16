import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from 'rxjs';
import {UnidadesService} from "../../../services/unidades.service";
import {CuentasService} from "../../../services/cuentas.service";
import {ReservasService} from "../../../services/reservas.service";
import {TiposPagoService} from "../../../services/tiposPago.service";
import {DescuentosService} from "../../../services/descuentos.service";
import {DialogService} from "../../../services/dialog.service";
import {IngresoUnidadesService} from "../../../services/pagos.service";
import {ToastrService} from "ngx-toastr";
import {TablaCobranzaService} from "../../../services/tablaCobranza.service";


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
  saldo: number = 0;
  date = new Date();

  unidades: any[] = [];
  cuentasPago: any[] = [];
  reservas: any[] = [];
  tiposPago: any[] = [];
  descuentos: any[] = [];
  tablaCobranzas: any[] = [];

  pagoMensualidadForm: FormGroup;
  datosUnidadForm: FormGroup;
  cuentasPagoForm: FormGroup;
  tiposPagoForm: FormGroup;
  descuentosForm: FormGroup;
  sumaTotalForm: FormGroup;

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private _ingresoUnidades: IngresoUnidadesService,
    private _reservasService: ReservasService,
    private _cuentaPagoService: CuentasService,
    private _tipoPagoService: TiposPagoService,
    private _descuentoService: DescuentosService,
    private _tablaCobranzaService: TablaCobranzaService,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {
    this.pagoMensualidadForm = this.fb.group({
      idUnidad: ['', Validators.required],
      idCuenta: ['', Validators.required],
      idTiposPago: ['', Validators.required],
      idDescuento: ['', Validators.required],
      numeroReciboPago: ['', [Validators.required, Validators.pattern(/^.{19,20}$/)]],
      fechaReciboPago: [this.date.toLocaleString],
      observacionesMensualidadPago: [''],
      estadoIngreso: ['Activo'],
      estadoReciboPago: ['Pagado'],
      valorPago: ['', Validators.required],
      saldo: [''],
      modoPago: ['Mensualidad'],
      mes: ['']
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
      idDescuento: [''],
      nombreDescuento: [''],
      valorDescuento: ['']
    });

    this.sumaTotalForm = this.fb.group({
      sumaTotal: ['']
    })

    this.recoverData()
  }

  ngOnInit(): void {
    this.getDatoUnidad();
    this.getCuentaPago();
    this.getValoresReservas();
    this.getTiposPago();
    this.getDescuentos();
    this.getTablaCobranzas();
    //this.onUpdateTablaCobranzas();
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

  getTablaCobranzas() {
    this.subscription.add(
      this._tablaCobranzaService.getTablaCobranzasByUnidad(this.idUnidad).subscribe(data => {
        this.tablaCobranzas = [];
        data.forEach((element: any) => {
          this.tablaCobranzas.push({
            ...element.payload.doc.data()
          })
        })
        //console.log(this.tablaCobranzas);
      })
    );
  }

  getCuentaPago() {
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

  getTiposPago() {
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

  getDescuentos() {
    this.subscription.add(
      this._descuentoService.getDescuentos(this.idCondominio).subscribe(data => {
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

  onCuentaPagoChanged(item: any) {
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

  onTipoPagoChanged(item: any) {
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

  onDescuentoChanged(item: any) {
    this.subscription.add(
      this._descuentoService.getDescuento(item).subscribe(data => {
        this.loading = false;
        this.descuentosForm.setValue({
          idDescuento: data.payload.data()['idDescuento'],
          nombreDescuento: data.payload.data()['nombreDescuento'],
          valorDescuento: data.payload.data()['valorDescuento']
        })
        this.sumaTotalForm.setValue({
          sumaTotal: Math.round(((this.datosUnidadForm.value.cuotaUnidad + this.sumaValorReservas - this.descuentosForm.value.valorDescuento) + Number.EPSILON) * 100) / 100
        })
        //console.log (typeof (this.sumaTotalForm.value.sumaTotal));

      })
    )
  }

  //seleccionar la unidad y eliminar campo unidad en la tabla ya que es redundante

  onCreatePagoMensualidad() {

    this._dialogService.confirmDialog({
      title: 'Registrar Pago',
      message: '¿Está seguro que desea registrar el pago?',
      confirmText: 'Sí',
      cancelText: 'No',
    }).subscribe(res => {
      this.saldo = (this.sumaTotalForm.value.sumaTotal - this.pagoMensualidadForm.value.valorPago);
      if (res) {
        const pagoMensualidad: any = {
          idAdministrador: this.idAdministrador,
          idCondominio: this.idCondominio,
          idUnidad: this.idUnidad,
          unidad: this.datosUnidadForm.value.unidad,
          fechaReciboPago: this.date.toLocaleString(),
          numeroReciboPago: this.pagoMensualidadForm.value.numeroReciboPago,
          nombreResidente: this.datosUnidadForm.value.nombreResidente,
          apellidoResidente: this.datosUnidadForm.value.apellidoResidente,
          cuotaUnidad: this.datosUnidadForm.value.cuotaUnidad,
          sumaValorReservas: this.datosUnidadForm.value.sumaValorReservas,
          nombreCuenta: this.cuentasPagoForm.value.nombreCuenta,
          tipoCuenta: this.cuentasPagoForm.value.tipoCuenta,
          tiposPago: this.tiposPagoForm.value.tiposPago,
          detalleTiposPago: this.tiposPagoForm.value.detalleTiposPago,
          idDescuento: this.descuentosForm.value.idDescuento,
          valorDescuento: this.descuentosForm.value.valorDescuento,
          valorTotal: this.sumaTotalForm.value.sumaTotal,
          observaciones: this.pagoMensualidadForm.value.observacionesMensualidadPago,
          estadoReciboPago: this.pagoMensualidadForm.value.estadoReciboPago,
          estadoIngreso: this.pagoMensualidadForm.value.estadoIngreso,
          valorPago: this.pagoMensualidadForm.value.valorPago,
          saldo: this.saldo,
          modoPago: this.pagoMensualidadForm.value.modoPago,
          mes: this.date.toLocaleString("es-ES", {month: "long"}) + this.date.toLocaleString("es-ES", {year: 'numeric'})
        }
        this.loading = true;
        this._ingresoUnidades.savePago(pagoMensualidad).then(() => {
          this.toastr.success('El pago fue registrado exitosamente', 'Pago Registrado', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.router.navigate(['/admin/finanzas/registrarMensualidad']);
        }).catch(error => {
          console.log(error);
        })
      }
      this.onUpdateEstadoReservasPagadas();
      this.onUpdateTablaCobranzas();
    });
  }

  onUpdateEstadoReservasPagadas() {
    this.reservas.forEach((element: any) => {
      const pagoReservaData: any = {
        pagoReserva: 'Pagado'
      }
      this._reservasService.actualizarReserva(element.idReserva, pagoReservaData);
    })
  }

  onUpdateTablaCobranzas() {
    let fecha = this.date.toLocaleString("es-ES", {month: "long"}) + this.date.toLocaleString("es-ES", {year: 'numeric'})
    //console.log(fecha);
    //console.log(this.saldo);
    if (fecha == 'junio2022') {
      //console.log(this.tablaCobranzas);
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          junio2022: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
    else if (fecha == 'julio2022'){
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          julio2022: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
    else if (fecha == 'agosto2022'){
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          agosto2022: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
    else if (fecha == 'septiembre2022'){
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          septiembre2022: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
    else if (fecha == 'octubre2022'){
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          octubre2022: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
    else if (fecha == 'noviembre2022'){
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          noviembre2022: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
    else if (fecha == 'diciembre2022'){
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          diciembre2022: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
    else if (fecha == 'enero2023'){
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          enero2023: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
    else if (fecha == 'febrero2023'){
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          febrero2023: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
    else if (fecha == 'marzo2023'){
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          marzo2023: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
    else if (fecha == 'abril2023'){
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          abril2023: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
    else if (fecha == 'mayo2023'){
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          mayo2023: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
    else if (fecha == 'junio2023'){
      this.tablaCobranzas.forEach((element: any) => {
        const actualizarTabla: any = {
          junio2023: this.saldo
        }
        this._tablaCobranzaService.actualizarTablaCobranzas(element.idTablaCobranzas, actualizarTabla);
      })
    }
  }

  onBacktoList(): void {
    this.router.navigate(['admin/finanzas//registrarMensualidad']);
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.pagoMensualidadForm.controls;
  }

  get numeroReciboPago() {
    return this.pagoMensualidadForm.get('numeroReciboPago');
  }
}
