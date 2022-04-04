import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { UnidadesService } from 'src/app/services/unidades.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
  usuarios: any[] = [];

  loading = false;
  id: string | null;
  private isEmail = /\S+@\S+\.\S+/;

  unidadesForm: FormGroup;
  usuariosForm: FormGroup;

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private aRoute: ActivatedRoute,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _usuarioService: UsuariosService
  ) {

    this.unidadesForm = this.fb.group({
      unidad: ['', Validators.required],
      cuotaUnidad: ['', Validators.required],
      areaUnidad: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      nombrePropietario: ['', Validators.required],
      apellidoPropietario: ['', Validators.required],
      telefonoPropietario: ['', [Validators.pattern(/^\d+$/)]],
      emailPropietario: ['', [Validators.required, Validators.pattern(this.isEmail)]],
    });

    this.usuariosForm = this.fb.group({
      nombreResidente: [''],
      apellidoResidente: [''],
      telefonoResidente: [''],
      emailResidente: [''],
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
    this.idAministrador = <string>sessionStorage.getItem('idAministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
  }

  getDatosUnidade() {
    if (this.idUnidad !== null) {
      this.loading = true;
      this.subscription.add(
        this._unidadesService.getUnidad(this.idUnidad).subscribe(data => {
          this.loading = false;
          this.unidadesForm.setValue({
            unidad: data.payload.data()['unidad'],
            cuotaUnidad: data.payload.data()['cuotaUnidad'],
            areaUnidad: data.payload.data()['areaUnidad'],
            nombrePropietario: data.payload.data()['nombrePropietario'],
            apellidoPropietario: data.payload.data()['apellidoPropietario'],
            telefonoPropietario: data.payload.data()['telefonoPropietario'],
            emailPropietario: data.payload.data()['emailPropietario'],
          })
        })
      )
      this.getDatosUsuario();
    }
  }

  getDatosUsuario() {
    this.loading = true;
    this.subscription.add(
      this._usuarioService.getUsuario(this.idUsuario).subscribe(data => {
        this.loading = false;
        this.usuariosForm.setValue({
          nombreResidente: data.payload.data()['name'],
          apellidoResidente: data.payload.data()['last_name'],
          emailResidente: data.payload.data()['email'],
          telefonoResidente: data.payload.data()['phone'],
        })
      })
    )

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
          unidad: this.unidadesForm.value.unidad,
          cuotaUnidad: this.unidadesForm.value.cuotaUnidad,
          areaUnidad: this.unidadesForm.value.areaUnidad,
          nombrePropietario: nombre,
          apellidoPropietario: apellido,
          telefonoPropietario: this.unidadesForm.value.telefonoPropietario,
          emailPropietario: this.unidadesForm.value.emailPropietario,
          nombreResidente: this.usuariosForm.value.nombreResidente,
          apellidoResidente: this.usuariosForm.value.apellidoResidente,
          telefonoResidente: this.usuariosForm.value.telefonoResidente,
          emailResidente: this.usuariosForm.value.emailResidente,
        }

        //Crea el documento
        this.loading = true;
        this._unidadesService.actualizarUnidad(this.idUnidad, unidad).then(() => {

          this.toastr.success('La información fue modificada con exito', 'Información modificada', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.router.navigate(['/admin/ajustes/ajustesUnidades']);

        }).catch(error => {
          console.log(error);
        })
      }
    });
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUnidades']);
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.unidadesForm.controls;
  }

  get cuotaUnidad() {
    return this.unidadesForm.get('cuotaUnidad');
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
