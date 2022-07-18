import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DialogService } from "../../../services/dialog.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-cuentas-fecha',
  templateUrl: './cuentas-fecha.component.html',
  styleUrls: ['./cuentas-fecha.component.css']
})
export class CuentasFechaComponent implements OnInit {

  idAdministrador: string = '';
  idCondominio: string = '';
  idCuenta: string = '';
  date = Date;
  date2 = Date;
  loading = false;
  pipe = new DatePipe('en-US');
  pipe2 = new DatePipe('en-US');
  dateWithPipe: string = '';
  dateWithPipe2: string = '';

  dataForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _dialogService: DialogService,
  ) {
    this.dataForm = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idCuenta = <string>sessionStorage.getItem('idCuenta');
  }

  onGoSeleccion() {
    this.date = this.dataForm.value.fechaInicio;
    this.date2 = this.dataForm.value.fechaFin;
    //console.log(this.date);
    //console.log(typeof(this.date));

    this._dialogService.confirmDialog({
      title: 'Seleccionar Fecha',
      message: '¿Está seguro del rango de fechas?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      // @ts-ignore
      this.dateWithPipe = this.pipe.transform(this.date, 'yyyy/MM/dd');
      let fecha1 = Date.parse(this.dateWithPipe);
      // @ts-ignore
      this.dateWithPipe2 = this.pipe.transform(this.date2, 'yyyy/MM/dd')
      let fecha2 = Date.parse(this.dateWithPipe2);
      if (res) {
        sessionStorage.setItem('fechaInicio', String(fecha1));
        sessionStorage.setItem('fechaFin', String(fecha2));
        //console.log(sessionStorage);
      }
      this.loading = true;
      this.router.navigate(['admin/reportes/cuentasSelected']);
    })

  }

  onBacktoList(): void {
    this.router.navigate(['admin/reportes/cuentas']);
  }

}
