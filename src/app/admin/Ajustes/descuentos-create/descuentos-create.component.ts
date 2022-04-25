import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {DescuentosService} from "../../../services/descuentos.service";

@Component({
  selector: 'app-descuentos-create',
  templateUrl: './descuentos-create.component.html',
  styleUrls: ['./descuentos-create.component.css']
})
export class DescuentosCreateComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = ''
  loading = false;

  descuentosForm: FormGroup;

  constructor(
    private router: Router,
    private _decuentoService: DescuentosService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.descuentosForm = this.fb.group({
      nombreDescuento: ['', Validators.required],
      valorDescuento: ['', Validators.required],
    });

    this.recoverData();
  }

  ngOnInit(): void {
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  onCreateDescuento() {

    const nombreDescuentoData = String(this.descuentosForm.value.nombreDescuento).charAt(0).toLocaleUpperCase() + String(this.descuentosForm.value.nombreDescuento).slice(1);

    this._dialogService.confirmDialog({
      title: 'Agregar descuento',
      message: '¿Está seguro de agregar el descuento?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {

        const Descuento: any = {
          nombreDescuento: nombreDescuentoData,
          valorDescuento: <number>this.descuentosForm.value.valorDescuento,
        }

        //Crea el documento
        this.loading = true;
        this._decuentoService.saveDescuento(Descuento,
          this.idAministrador,
          this.idCondominio
        ).then(() => {
          this.toastr.success('El descuento fué registrado con exito', 'Descuento registrado', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.router.navigate(['/admin/ajustes/descuentos']);

        }).catch(error => {
          console.log(error);
          this.loading = false;
        });
      }
    });
  }



  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/descuentos']);
  }

}
