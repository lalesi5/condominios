import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {CuentasService} from "../../../services/cuentas.service";

@Component({
  selector: 'app-cuentas-edit',
  templateUrl: './cuentas-edit.component.html',
  styleUrls: ['./cuentas-edit.component.css']
})
export class CuentasEditComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idCuenta: string = '';
  loading = false;

  /*Formularios*/
  cuentasForm: FormGroup;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private _cuentaService: CuentasService,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.cuentasForm = this.fb.group({
      nombreCuenta: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      saldoInicial: ['']
    });

    this.recoverData();
  }

  ngOnInit(): void {
    this.onListCuenta();
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idCuenta = <string>sessionStorage.getItem('idCuenta');
  }

  onListCuenta() {
    if (this.idCuenta !== null) {
      this.loading = true;
      this.subscription.add(
        this._cuentaService.getCuenta(this.idCuenta).subscribe(data => {
          this.loading = false;
          this.cuentasForm.setValue({
            nombreCuenta: data.payload.data()['nombreCuenta'],
            tipoCuenta: data.payload.data()['tipoCuenta'],
            saldoInicial: data.payload.data()['saldoInicial']
          })
        })
      )
    }
  }

  onEditCuenta() {

    const nombreCuentaData = String(this.cuentasForm.value.nombreCuenta).charAt(0).toLocaleUpperCase() + String(this.cuentasForm.value.nombreCuenta).slice(1);
    const tipoCuentaData = String(this.cuentasForm.value.tipoCuenta).charAt(0).toLocaleUpperCase() + String(this.cuentasForm.value.tipoCuenta).slice(1);

    const idCuenta = this.idCuenta;

    const Cuenta: any = {
      nombreCuenta: nombreCuentaData,
      tipoCuenta: tipoCuentaData,
      saldoInicial: this.cuentasForm.value.saldoInicial

    }

    this._dialogService.confirmDialog({
      title: 'Modificar cuenta',
      message: '¿Está seguro de modificar la cuenta?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this.loading = true;
        this._cuentaService.updateCuenta(idCuenta!, Cuenta).then(() => {
          this.loading = false;
          this.toastr.success('La información de la cuenta fue modificada con exito', 'Cuenta modificada', {
            positionClass: 'toast-bottom-right'
          });
        })
        this.loading = false;
        this.router.navigate(['/admin/ajustes/cuentas']);
      }
    });
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/cuentas']);
  }

}
