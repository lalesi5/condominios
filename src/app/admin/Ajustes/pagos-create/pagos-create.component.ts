import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CuentasService} from "../../../services/cuentas.service";
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {TiposPagoService} from "../../../services/tiposPago.service";

@Component({
  selector: 'app-pagos-create',
  templateUrl: './pagos-create.component.html',
  styleUrls: ['./pagos-create.component.css']
})
export class PagosCreateComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = ''
  loading = false;

  pagosForm: FormGroup;

  constructor(
    private router: Router,
    private _pagosService: TiposPagoService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.pagosForm = this.fb.group({
      tiposPago: ['', Validators.required],
      detalleTiposPago: ['', Validators.required],
    });

    this.recoverData();
  }

  onCreatePagos() {

    const tipoPagoData = String(this.pagosForm.value.tiposPago).charAt(0).toLocaleUpperCase() + String(this.pagosForm.value.tiposPago).slice(1);
    const detallePagoData = String(this.pagosForm.value.detalleTiposPago).charAt(0).toLocaleUpperCase() + String(this.pagosForm.value.detalleTiposPago).slice(1);

    this._dialogService.confirmDialog({
      title: 'Agregar tipo pago',
      message: '¿Está seguro de agregar el tipo de pago?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {

        const TipoPagos: any = {
          tiposPago: tipoPagoData,
          detalleTiposPago: detallePagoData,
        }

        //Crea el documento
        this.loading = true;
        this._pagosService.saveTipoPago(TipoPagos,
          this.idAministrador,
          this.idCondominio
        ).then(() => {
          this.toastr.success('El tipo de pago fué registrado con exito', 'Tipo de pago registrado', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.router.navigate(['/admin/ajustes/pagos']);

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
    this.router.navigate(['/admin/ajustes/pagos']);
  }
}
