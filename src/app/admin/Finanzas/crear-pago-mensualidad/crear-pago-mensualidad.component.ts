import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {UnidadesService} from "../../../services/unidades.service";
import { DialogService } from 'src/app/services/dialog.service';
import {CuentasService} from "../../../services/cuentas.service";


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

  unidades: any[] = [];
  cuentasPago: any[] = [];

  pagoMensualidadForm: FormGroup;
  datosUnidadForm: FormGroup;
  cuentasPagoForm: FormGroup;

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private _cuentaPagoService: CuentasService,
    private fb: FormBuilder,
  ) {
    this.pagoMensualidadForm = this.fb.group({
      fechaMensualidad: ['', Validators.required],
      idUnidad: ['', Validators.required],
      idCuenta: ['', Validators.required],
      idAreaComunal: ['', Validators.required],
    });

    this.datosUnidadForm = this.fb.group({
      cuotaUnidad: [''],
      unidad: [''],
      nombreResidente: [''],
      apellidoResidente: ['']
    });

    this.cuentasPagoForm = this.fb.group({
      nombreCuenta: [''],
      tipoCuenta: ['']
    })

    this.recoverData()
  }

  ngOnInit(): void {
    this.getDatoUnidad();
    this.getCuentaPago();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    console.log(sessionStorage);
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

  onUnitChanged(item: any) {
    this.subscription.add(
      this._unidadesService.getUnidad(item).subscribe(data => {
        this.loading = false;
        this.datosUnidadForm.setValue({
          cuotaUnidad: data.payload.data()['cuotaUnidad'],
          unidad: data.payload.data()['unidad'],
          nombreResidente: data.payload.data()['nombreResidente'],
          apellidoResidente: data.payload.data()['apellidoResidente'],
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

  onBacktoList(): void {
    this.router.navigate(['admin/finanzas//registrarMensualidad']);
  }

}
