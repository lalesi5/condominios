import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {CuentasService} from "../../../services/cuentas.service";

@Component({
  selector: 'app-cuentas-create',
  templateUrl: './cuentas-create.component.html',
  styleUrls: ['./cuentas-create.component.css']
})
export class CuentasCreateComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = ''
  loading = false;

  cuentasForm: FormGroup;

  constructor(
    private router: Router,
    private _cuentasService: CuentasService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.cuentasForm = this.fb.group({
      nombreCuenta: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      saldoInicial: ['']
    });

    this.recoverData();
  }

  onCreateCuenta() {

    const nombreCuentaData = String(this.cuentasForm.value.nombreCuenta).charAt(0).toLocaleUpperCase() + String(this.cuentasForm.value.nombreCuenta).slice(1);
    const tipoCuentaData = String(this.cuentasForm.value.tipoCuenta).charAt(0).toLocaleUpperCase() + String(this.cuentasForm.value.tipoCuenta).slice(1);

    this._dialogService.confirmDialog({
      title: 'Agregar cuenta',
      message: '¿Está seguro de agregar la cuenta?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {

        const Cuenta: any = {
          nombreCuenta: nombreCuentaData,
          tipoCuenta: tipoCuentaData,
          saldoInicial: this.cuentasForm.value.saldoInicial
        }

        //Crea el documento
        this.loading = true;
        this._cuentasService.saveCuenta(Cuenta,
          this.idAministrador,
          this.idCondominio
        ).then(() => {
          this.toastr.success('La cuenta fué registrada con exito', 'Cuenta registrada', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.router.navigate(['/admin/ajustes/cuentas']);

        }).catch(error => {
          console.log(error);
          this.loading = false;
        });
      }
    });
  }

  ngOnInit(): void {
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/cuentas']);
  }

}
