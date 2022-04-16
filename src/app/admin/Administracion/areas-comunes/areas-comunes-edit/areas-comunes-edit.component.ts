import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AreasComunalesService } from 'src/app/services/areasComunales.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-areas-comunes-edit',
  templateUrl: './areas-comunes-edit.component.html',
  styleUrls: ['./areas-comunes-edit.component.css']
})
export class AreasComunesEditComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idAreaComunal: string = '';
  loading = false;

  /*Formularios*/
  areaComunalForm: FormGroup;

  constructor(
    private router: Router,
    private _AreaComunalService: AreasComunalesService,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.areaComunalForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      valorReserva: ['', Validators.required]
    })

    this.recoverData();
  }

  ngOnInit(): void {
    this.onListAreaComunal();
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idAreaComunal = <string>sessionStorage.getItem('idAreaComunal');
  }

  onListAreaComunal() {
    if (this.idAreaComunal !== null) {
      this.loading = true;
      this.subscription.add(
        this._AreaComunalService.getArea(this.idAreaComunal).subscribe(data => {
          this.loading = false;
          this.areaComunalForm.setValue({
            nombre: data.payload.data()['nombre'],
            descripcion: data.payload.data()['descripcion'],
            valorReserva: data.payload.data()['valorReserva']
          })
        })
      )
    }
  }

  onEditAreaComunal() {

    const nombreArea = String(this.areaComunalForm.value.nombre).charAt(0).toLocaleUpperCase() + String(this.areaComunalForm.value.nombre).slice(1);
    const descripcionArea = String(this.areaComunalForm.value.descripcion).charAt(0).toLocaleUpperCase() + String(this.areaComunalForm.value.descripcion).slice(1);
    const valorReservaData = this.areaComunalForm.value.valorReserva;

    const idArea = this.idAreaComunal;

    const areaComunal: any = {
      nombre: nombreArea,
      descripcion: descripcionArea,
      valorReserva: valorReservaData
    }

    this._dialogService.confirmDialog({
      title: 'Modificar área',
      message: '¿Está seguro de modificar el área?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this.loading = true;
        this._AreaComunalService.actualizarArea(idArea!, areaComunal).then(() => {
          this.loading = false;
          this.toastr.success('La información del área comunal fue modificada con exito', 'Área modificada', {
            positionClass: 'toast-bottom-right'
          });
        })
        this.loading = false;
        this.router.navigate(['/admin/administracion/areasComunes/listarAreasComunes']);
      }
    });
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/administracion/areasComunes/listarAreasComunes']);
  }

}
