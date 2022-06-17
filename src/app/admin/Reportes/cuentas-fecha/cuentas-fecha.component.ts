import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-cuentas-fecha',
  templateUrl: './cuentas-fecha.component.html',
  styleUrls: ['./cuentas-fecha.component.css']
})
export class CuentasFechaComponent implements OnInit {

  idAdministrador: string = '';
  idCondominio: string = '';
  idCuenta: string = '';
  date: string = '';
  date2: string = '';
  loading = false;

  dataForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _dialogService: DialogService,
  ) {
    this.dataForm = this.fb.group({
      fechaInicio: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idCuenta = <string>sessionStorage.getItem('idCuenta');
  }

  onGoSeleccion() {
    this.date = this.dataForm.value.fechaInicio.toLocaleString();
    console.log(this.date);
    this._dialogService.confirmDialog({
      title: 'Seleccionar Fecha',
      message: '¿Está seguro del rango de fechas?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        sessionStorage.setItem('fechaInicio', this.date);
        console.log(this.date);
      }
      this.loading = true;
      this.router.navigate(['admin/reportes/cuentasSelected']);
    })

  }

  onBacktoList(): void {
    this.router.navigate(['admin/reportes/cuentas']);
  }

}
