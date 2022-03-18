import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UnidadesService } from '../../../services/unidades.service';
import { Subscription } from "rxjs";
import { UsuariosService } from "../../../services/usuarios.service";
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-ajustes-unidades-create',
  templateUrl: './ajustes-unidades-create.component.html',
  styleUrls: ['./ajustes-unidades-create.component.css']
})
export class AjustesUnidadesCreateComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idUnidad: string = '';
  idUsuario: string = '';
  unidades: any[] = [];
  usuarios: any[] = [];
  condominio: any[] = [];
  private isEmail = /\S+@\S+\.\S+/;
  loading = false;

  unidadesForm: FormGroup;

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private _usuarioService: UsuariosService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
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


    this.recoverData();
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.idUsuario = navigations.idUsuario;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  getUsuarios() {
    this.subscription.add(
      this._usuarioService.getUsuariosID(this.idUsuario).subscribe(data => {
        data.forEach((element: any) => {
          this.usuarios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onCreateUnidades() {

    const nombre = String(this.unidadesForm.value.nombrePropietario).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    const apellido = String(this.unidadesForm.value.apellidoPropietario).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());

    this._dialogService.confirmDialog({
      title: 'Crear unidad',
      message: '¿Está seguro de crear la unidad?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {

        const unidad: any = {
          numeroUnidad: this.unidadesForm.value.numeroUnidad,
          tipoUnidad: this.unidadesForm.value.tipoUnidad,
          areaUnidad: this.unidadesForm.value.areaUnidad,
          nombreResidente: this.unidadesForm.value.nombreResidente,
          apellidoResidente: this.unidadesForm.value.apellidoResidente,
          telefonoResidente: this.unidadesForm.value.telefonoResidente,
          emailResidente: this.unidadesForm.value.emailResidente,
          nombrePropietario: nombre,
          apellidoPropietario: apellido,
          telefonoPropietario: this.unidadesForm.value.telefonoPropietario,
          emailPropietario: this.unidadesForm.value.emailPropietario,
          idAdministrador: this.idAministrador,
          idCondominio: this.idCondominio,
          idUsuario: this.idUsuario
        }

        //Crea el documento
        this.loading = true;
        this._unidadesService.createUnidades(unidad).then(() => {

          this.toastr.success('La unidad fue creada con exito', 'Unidad registrada', {
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

  get numeroUnidad() {
    return this.unidadesForm.get('numeroUnidad');
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
