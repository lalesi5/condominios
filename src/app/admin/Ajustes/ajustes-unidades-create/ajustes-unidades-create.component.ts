import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
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

  unidadesForm = new FormGroup({
    numeroUnidad: new FormControl,
    tipoUnidad: new FormControl,
    areaUnidad: new FormControl,
    nombreArrendatario: new FormControl,
    apellidoArrendatario: new FormControl,
    celularArrendatario: new FormControl,
    emailArrendatario: new FormControl,
    nombreArrendador: new FormControl,
    ApellidoArrendador: new FormControl,
    emailArrendador: new FormControl,
    celularArrendador: new FormControl
  })

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

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUnidades'], this.navigationExtras);
  }

  onCreateUnidades() {

    this._dialogService.confirmDialog({
      title: 'Crear unidad',
      message: '¿Está seguro de crear la unidad?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this._unidadesService.createUnidades(this.unidadesForm.value,
          this.idAministrador,
          this.idCondominio,
          this.idUsuario).then(() => {

            this.toastr.success('La unidad fue creada con exito', 'Unidad registrada', {
              positionClass: 'toast-bottom-right'
            });
            //this.loading = false;
            //this.navigationExtras.state = this.condominio;
            this.router.navigate(['/admin/ajustes'], this.navigationExtras);

          }).catch(error => {
            console.log(error);
          })
      }
    });
  }
}
