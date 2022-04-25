import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CuentasService} from "../../../services/cuentas.service";
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {DescuentosService} from "../../../services/descuentos.service";

@Component({
  selector: 'app-descuentos-edit',
  templateUrl: './descuentos-edit.component.html',
  styleUrls: ['./descuentos-edit.component.css']
})
export class DescuentosEditComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idDescuento: string = '';
  loading = false;

  /*Formularios*/
  descuentosForm: FormGroup;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private _descuentoService: DescuentosService,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.descuentosForm = this.fb.group({
      nombreDescuento: ['', Validators.required],
      valorDescuento: ['', Validators.required],
    });

    this.recoverData();
  }

  ngOnInit(): void {
    this.onListCuenta();
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idDescuento = <string>sessionStorage.getItem('idDescuento');
  }

  onListCuenta() {
    if (this.idDescuento !== null) {
      this.loading = true;
      this.subscription.add(
        this._descuentoService.getDescuento(this.idDescuento).subscribe(data => {
          this.loading = false;
          this.descuentosForm.setValue({
            nombreDescuento: data.payload.data()['nombreDescuento'],
            valorDescuento: data.payload.data()['valorDescuento'],
          })
        })
      )
    }
  }

  onEditCuenta() {

    const nombreDescuentoData = String(this.descuentosForm.value.nombreDescuento).charAt(0).toLocaleUpperCase() + String(this.descuentosForm.value.nombreDescuento).slice(1);

    const idDescuento = this.idDescuento;

    const Descuento: any = {
      nombreDescuento: nombreDescuentoData,
      valorDescuento: <number>this.descuentosForm.value.valorDescuento,
    }

    this._dialogService.confirmDialog({
      title: 'Modificar cuenta',
      message: '¿Está seguro de modificar la cuenta?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this.loading = true;
        this._descuentoService.updateDescuento(idDescuento!, Descuento).then(() => {
          this.loading = false;
          this.toastr.success('La información del descuento fue modificado con exito', 'Descuento modificado', {
            positionClass: 'toast-bottom-right'
          });
        })
        this.loading = false;
        this.router.navigate(['/admin/ajustes/descuentos']);
      }
    });
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/descuentos']);
  }

}
