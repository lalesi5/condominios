import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CuentasService } from "../../../services/cuentas.service";
import { TiposPagoService } from "../../../services/tiposPago.service";
import { DialogService } from "../../../services/dialog.service";
import { ToastrService } from "ngx-toastr";
import { extraordinariosService } from "../../../services/extraordinarios.service";
import {IngresoUnidadesService} from "../../../services/pagos.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-registrar-extraordinarios-finanzas',
  templateUrl: './registrar-extraordinarios-finanzas.component.html',
  styleUrls: ['./registrar-extraordinarios-finanzas.component.css']
})
export class RegistrarExtraordinariosFinanzasComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAdministrador: string = '';
  idCondominio: string = '';
  loading = false;
  date = new Date();
  pipe = new DatePipe('en-US');

  tiposPago: any[] = [];
  cuentasPago: any[] = [];

  extraordinariosForm: FormGroup;
  tiposPagoForm: FormGroup;
  cuentasPagoForm: FormGroup;

  constructor(
    private router: Router,
    private _cuentaPagoService: CuentasService,
    private _tipoPagoService: TiposPagoService,
    private _dialogService: DialogService,
    private _extraordinariosService: extraordinariosService,
    private _ingresoUnidades: IngresoUnidadesService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {

    this.extraordinariosForm = this.fb.group({
      idCuenta: ['', Validators.required],
      idTiposPago: ['', Validators.required],
      numeroReciboPago: ['', [Validators.required, Validators.pattern(/^.{10,20}$/)]],
      fechaReciboPago: [this.date.toLocaleString],
      observaciones: ['', Validators.required],
      valorPago: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      estadoIngreso: ['Activo'],
      estadoReciboPago: ['Pagado'],
      modoPago: ['Extraordinario']
    });

    this.tiposPagoForm = this.fb.group({
      tiposPago: [''],
      detalleTiposPago: ['']
    });

    this.cuentasPagoForm = this.fb.group({
      idCuenta: [''],
      nombreCuenta: [''],
      tipoCuenta: [''],
      saldoInicial: ['']
    });

    this.recoverData();

  }

  ngOnInit(): void {
    this.getCuentaPago();
    this.getTiposPago();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
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

  onCuentaPagoChanged(item: any) {
    this.subscription.add(
      this._cuentaPagoService.getCuenta(item).subscribe(data => {
        this.loading = false;
        this.cuentasPagoForm.setValue({
          idCuenta: data.payload.data()['idCuenta'],
          nombreCuenta: data.payload.data()['nombreCuenta'],
          tipoCuenta: data.payload.data()['tipoCuenta'],
          saldoInicial: data.payload.data()['saldoInicial']
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

  onCreatePagoExtraordinario() {
    this._dialogService.confirmDialog({
      title: 'Registrar Pago',
      message: '¿Está seguro que desea registrar el pago?',
      confirmText: 'Sí',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        const pagoExtraordinarias: any = {
          idAdministrador: this.idAdministrador,
          idCondominio: this.idCondominio,
          idCuenta: this.cuentasPagoForm.value.idCuenta,
          fechaReciboPago: this.pipe.transform(this.date, 'yyyy/MM/dd'),
          numeroReciboPago: this.extraordinariosForm.value.numeroReciboPago,
          valorPago: this.extraordinariosForm.value.valorPago,
          nombreCuenta: this.cuentasPagoForm.value.nombreCuenta,
          tipoCuenta: this.cuentasPagoForm.value.tipoCuenta,
          tiposPago: this.tiposPagoForm.value.tiposPago,
          detalleTiposPago: this.tiposPagoForm.value.detalleTiposPago,
          observaciones: this.extraordinariosForm.value.observaciones,
          estadoReciboPago: this.extraordinariosForm.value.estadoReciboPago,
          estadoIngreso: this.extraordinariosForm.value.estadoIngreso,
          modoPago: this.extraordinariosForm.value.modoPago
        }
        this.loading = true;
        this._ingresoUnidades.savePago(pagoExtraordinarias).then(() => {
          this.toastr.success('El pago fue registrado exitosamente', 'Pago Registrado', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.router.navigate(['/admin/finanzas/ingresosExtraordinarios']);
        }).catch(error => {
          console.log(error);
        })
      }
      this.onUpdateSaldo();
    });
  }

  onUpdateSaldo() {

    const cuentaData: any = {
      saldoInicial: this.cuentasPagoForm.value.saldoInicial + this.extraordinariosForm.value.valorPago
    }
    this._cuentaPagoService.updateCuenta(this.cuentasPagoForm.value.idCuenta, cuentaData);
  }

  onBacktoList(): void {
    this.router.navigate(['admin/finanzas//ingresosExtraordinarios']);
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.extraordinariosForm.controls;
  }

  get numeroReciboPago() {
    return this.extraordinariosForm.get('numeroReciboPago');
  }

  get valorPago() {
    return this.extraordinariosForm.get('valorPago');
  }
}
