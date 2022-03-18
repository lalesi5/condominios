import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'app-ajustes-unidades-edit',
  templateUrl: './ajustes-unidades-edit.component.html',
  styleUrls: ['./ajustes-unidades-edit.component.css']
})
export class AjustesUnidadesEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idUnidad: string = '';
  idUsuario: string = '';
  unidades: any[] = [];
  condominio: any[] = [];

  loading = false;
  id: string | null;
  private isEmail = /\S+@\S+\.\S+/;

  unidadesForm: FormGroup;

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private aRoute: ActivatedRoute,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {

    this.unidadesForm = this.fb.group({
      numeroUnidad: ['', Validators.required],
      tipoUnidad: ['', Validators.required],
      areaUnidad: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      nombreResidente: [''],
      apellidoResidente: [''],
      telefonoResidente: [''],
      emailResidente: [''],
      nombrePropietario: ['', Validators.required],
      apellidoPropietario: ['', Validators.required],
      telefonoPropietario: ['', [Validators.pattern(/^\d+$/)]],
      emailPropietario: ['', [Validators.required, Validators.pattern(this.isEmail)]],
    });

    this.id = aRoute.snapshot.paramMap.get('id');

    this.recoverData();
  }

  ngOnInit(): void {
    this.getDatosUnidade();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.idUsuario = navigations.idUsuario;
    this.idUnidad = navigations.idUnidad;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  getDatosUnidade() {
    if (this.id !== null) {
      this.loading = true;
      this.subscription.add(
        this._unidadesService.getUnidad(this.id).subscribe(data => {
          this.loading = false;
          this.unidadesForm.setValue({
            numeroUnidad: data.payload.data()['numeroUnidad'],
            tipoUnidad: data.payload.data()['tipoUnidad'],
            areaUnidad: data.payload.data()['areaUnidad'],
            nombreResidente: data.payload.data()['nombreResidente'],
            apellidoResidente: data.payload.data()['apellidoResidente'],
            telefonoResidente: data.payload.data()['telefonoResidente'],
            emailResidente: data.payload.data()['emailResidente'],
            nombrePropietario: data.payload.data()['nombrePropietario'],
            apellidoPropietario: data.payload.data()['apellidoPropietario'],
            telefonoPropietario: data.payload.data()['telefonoPropietario'],
            emailPropietario: data.payload.data()['emailPropietario'],
          })
        })
      )
    }
  }

  onEditUnidades() {
    const nombre = String(this.unidadesForm.value.nombrePropietario).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    const apellido = String(this.unidadesForm.value.apellidoPropietario).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());

    this._dialogService.confirmDialog({
      title: 'Modificar información',
      message: '¿Está seguro de modificar la información?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {

        const unidad: any = {
          numeroUnidad: this.unidadesForm.value.numeroUnidad,
          tipoUnidad: this.unidadesForm.value.tipoUnidad,
          areaUnidad: this.unidadesForm.value.areaUnidad,
          nombrePropietario: nombre,
          apellidoPropietario: apellido,
          telefonoPropietario: this.unidadesForm.value.telefonoPropietario,
          emailPropietario: this.unidadesForm.value.emailPropietario,
        }

        //Crea el documento
        this.loading = true;
        this._unidadesService.actualizarUnidad(this.idUnidad, unidad).then(() => {

          this.toastr.success('La información fue modificada con exito', 'Información modificada', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.navigationExtras.state = this.condominio;
          this.router.navigate(['/admin/ajustes/ajustesUnidades'], this.navigationExtras);

        }).catch(error => {
          console.log(error);
        })
      }
    });
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUnidades'], this.navigationExtras);
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.unidadesForm.controls;
  }

  get areaUnidad() {
    return this.unidadesForm.get('areaUnidad');
  }

  get emailPropietario() {
    return this.unidadesForm.get('emailPropietario');
  }

  get telefonoPropietario() {
    return this.unidadesForm.get('telefonoPropietario');
  }
}
