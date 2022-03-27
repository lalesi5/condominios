import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AreasComunalesService} from '../../../services/areasComunales.service';
import {Subscription} from "rxjs";
import {DialogService} from 'src/app/services/dialog.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-ajustes-areas-comunales-edit',
  templateUrl: './ajustes-areas-comunales-edit.component.html',
  styleUrls: ['./ajustes-areas-comunales-edit.component.css']
})
export class AjustesAreasComunalesEditComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idAreaComunal: string = '';
  loading = false;

  /*Formularios*/
  areaComunalForm: FormGroup;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private _AreaComunalService: AreasComunalesService,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.areaComunalForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
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
          })
        })
      )
    }
  }

  onEditAreaComunal() {

    const nombreArea = String(this.areaComunalForm.value.nombre).charAt(0).toLocaleUpperCase() + String(this.areaComunalForm.value.nombre).slice(1);
    const descripcionArea = String(this.areaComunalForm.value.descripcion).charAt(0).toLocaleUpperCase() + String(this.areaComunalForm.value.descripcion).slice(1);

    const idArea = this.idAreaComunal;

    const areaComunal: any = {
      nombre: nombreArea,
      descripcion: descripcionArea,
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
        this.router.navigate(['/admin/ajustes/ajustesAreasComunales']);
      }
    });
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesAreasComunales']);
  }

}
