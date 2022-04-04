import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
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
  idAdministrador: string = '';
  idCondominio: string = '';
  idUnidad: string = '';
  idUsuario: string = '';
  usuarios: any[] = [];
  private isEmail = /\S+@\S+\.\S+/;
  loading = false;

  unidadesForm: FormGroup;

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private _usuarioService: UsuariosService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {

    this.unidadesForm = this.fb.group({
      unidad: ['', Validators.required],
      areaUnidad: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      cuotaUnidad: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
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
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
  }

  getUsuarios() {
    this.subscription.add(
      this._usuarioService.getUsuariosID(this.idUsuario).subscribe(data => {
        this.usuarios = [];
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

    const unidadInput = String(this.unidadesForm.value.unidad).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
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
          unidad: unidadInput,
          areaUnidad: this.unidadesForm.value.areaUnidad,
          cuotaUnidad: this.unidadesForm.value.cuotaUnidad,
          nombreResidente: this.unidadesForm.value.nombreResidente,
          apellidoResidente: this.unidadesForm.value.apellidoResidente,
          telefonoResidente: this.unidadesForm.value.telefonoResidente,
          emailResidente: this.unidadesForm.value.emailResidente,
          nombrePropietario: nombre,
          apellidoPropietario: apellido,
          telefonoPropietario: this.unidadesForm.value.telefonoPropietario,
          emailPropietario: this.unidadesForm.value.emailPropietario,
          idAdministrador: this.idAdministrador,
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

  get areaUnidad() {
    return this.unidadesForm.get('areaUnidad');
  }

  get cuotaUnidad() {
    return this.unidadesForm.get('cuotaUnidad');
  }

  get emailPropietario() {
    return this.unidadesForm.get('emailPropietario');
  }

  get telefonoPropietario() {
    return this.unidadesForm.get('telefonoPropietario');
  }
}
