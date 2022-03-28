import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AreasComunalesService} from 'src/app/services/areasComunales.service';
import {DialogService} from 'src/app/services/dialog.service';

@Component({
  selector: 'app-ajustes-areas-comunales-create',
  templateUrl: './ajustes-areas-comunales-create.component.html',
  styleUrls: ['./ajustes-areas-comunales-create.component.css']
})
export class AjustesAreasComunalesCreateComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = ''
  loading = false;

  /*Formularios*/
  areaComunalForm: FormGroup;

  constructor(
    private router: Router,
    private _AreaComunalService: AreasComunalesService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.areaComunalForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.recoverData();
  }

  ngOnInit(): void {
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  onCreateAreaComunal() {

    const nombreArea = String(this.areaComunalForm.value.nombre).charAt(0).toLocaleUpperCase() + String(this.areaComunalForm.value.nombre).slice(1);
    const descripcionArea = String(this.areaComunalForm.value.descripcion).charAt(0).toLocaleUpperCase() + String(this.areaComunalForm.value.descripcion).slice(1);

    this._dialogService.confirmDialog({
      title: 'Agregar área',
      message: '¿Está seguro de agregar el área?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {

        const areaComunal: any = {
          nombre: nombreArea,
          descripcion: descripcionArea,
        }

        //Crea el documento
        this.loading = true;
        this._AreaComunalService.saveAreasComunales(areaComunal,
          this.idAministrador,
          this.idCondominio
        ).then(() => {
          this.toastr.success('El área fue registrada con exito', 'Área registrada', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.router.navigate(['/admin/ajustes/ajustesAreasComunales']);

        }).catch(error => {
          console.log(error);
          this.loading = false;
        });
      }
    });
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesAreasComunales']);
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.areaComunalForm.controls;
  }

  get nombre() {
    return this.areaComunalForm.get('nombre');
  }

  get descripcion() {
    return this.areaComunalForm.get('descripcion');
  }

}
