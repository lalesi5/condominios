import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {TiposPagoService} from "../../../services/tiposPago.service";

@Component({
  selector: 'app-pagos-edit',
  templateUrl: './pagos-edit.component.html',
  styleUrls: ['./pagos-edit.component.css']
})
export class PagosEditComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idTipoPago: string = '';
  loading = false;

  /*Formularios*/
  pagosForm: FormGroup;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private _tiposPagoService: TiposPagoService,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.pagosForm = this.fb.group({
      tiposPago: ['', Validators.required],
      detalleTiposPago: ['', Validators.required],
    });

    this.recoverData();
  }

  ngOnInit(): void {
    this.onListTiposPago();
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idTipoPago = <string>sessionStorage.getItem('idTipoPago');
  }

  onListTiposPago() {
    if (this.idTipoPago !== null) {
      this.loading = true;
      this.subscription.add(
        this._tiposPagoService.getTipoPago(this.idTipoPago).subscribe(data => {
          this.loading = false;
          this.pagosForm.setValue({
            tiposPago: data.payload.data()['tiposPago'],
            detalleTiposPago: data.payload.data()['detalleTiposPago'],
          })
        })
      )
    }
  }

  onEditPagos() {

    const tipoPagoData = String(this.pagosForm.value.tiposPago).charAt(0).toLocaleUpperCase() + String(this.pagosForm.value.tiposPago).slice(1);
    const detallePagoData = String(this.pagosForm.value.detalleTiposPago).charAt(0).toLocaleUpperCase() + String(this.pagosForm.value.detalleTiposPago).slice(1);

    const idTipoPago = this.idTipoPago;

    const TipoPagos: any = {
      tiposPago: tipoPagoData,
      detalleTiposPago: detallePagoData,
    }

    this._dialogService.confirmDialog({
      title: 'Editar Tipo Pago',
      message: '¿Está seguro de editar el tipo de pago?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this.loading = true;
        this._tiposPagoService.updateTipoPago(idTipoPago!, TipoPagos).then(() => {
          this.loading = false;
          this.toastr.success('El tipo de pago fué registrado con exito', 'Tipo Pago modificado', {
            positionClass: 'toast-bottom-right'
          });
        })
        this.loading = false;
        this.router.navigate(['/admin/ajustes/pagos']);
      }
    });
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/pagos']);
  }

}
