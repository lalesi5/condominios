import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AreasComunalesService } from '../../../services/areasComunales.service';
import { Subscription } from "rxjs";
import { DialogService } from 'src/app/services/dialog.service';
import { ToastrService } from 'ngx-toastr';

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
  areasComunales: any[] = [];
  condominio: any[] = [];
  loading = false;
  id: string | null;

  /*Formularios*/
  areaComunalForm: FormGroup;

  navigationExtras: NavigationExtras = {
    state: {}
  }

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

    this.id = aRoute.snapshot.paramMap.get('id');

    this.recoverData();
  }

  ngOnInit(): void {
    this.onListAreaComunal();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.idAreaComunal = navigations.idAreaComunal;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  onListAreaComunal() {
    if (this.id !== null) {
      this.loading = true;
      this.subscription.add(
        this._AreaComunalService.getArea(this.id).subscribe(data => {
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

    const idArea = this.aRoute.snapshot.paramMap.get('id');

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
        this.navigationExtras.state = this.condominio;
        this.router.navigate(['/admin/ajustes/ajustesAreasComunales'], this.navigationExtras);
      }
    });
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesAreasComunales'], this.navigationExtras);
  }

}
