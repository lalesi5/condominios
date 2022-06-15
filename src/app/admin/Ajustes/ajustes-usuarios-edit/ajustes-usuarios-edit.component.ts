import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ToastrService} from 'ngx-toastr';
import {DialogService} from 'src/app/services/dialog.service';
import {UsuariosService} from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ajustes-usuarios-edit',
  templateUrl: './ajustes-usuarios-edit.component.html',
  styleUrls: ['./ajustes-usuarios-edit.component.css']
})
export class AjustesUsuariosEditComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idUsuario: string = '';

  editUsuarioForm: FormGroup;
  loading = false;
  private isEmail = /\S+@\S+\.\S+/;

  constructor(
    private router: Router,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _usuarioService: UsuariosService
  ) {
    this.editUsuarioForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      phone: ['', [Validators.pattern(/^.{6,13}$/)]],
      address: [''],
    })

    this.recoverData();
  }

  ngOnInit(): void {
    this.getDatosUsuario();
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
  }

  getDatosUsuario() {
    if (this.idUsuario !== null) {
      this.loading = true;
      this.subscription.add(
        this._usuarioService.getUsuario(this.idUsuario).subscribe(data => {
          this.loading = false;
          this.editUsuarioForm.setValue({
            name: data.payload.data()['name'],
            last_name: data.payload.data()['last_name'],
            email: data.payload.data()['email'],
            phone: data.payload.data()['phone'],
            address: data.payload.data()['address'],
          })
        })
      )
    }
  }

  onEditUser() {

    const nombre = String(this.editUsuarioForm.value.name).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    const apellido = String(this.editUsuarioForm.value.last_name).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    const direccion = String(this.editUsuarioForm.value.address).charAt(0).toLocaleUpperCase() + String(this.editUsuarioForm.value.address).slice(1);


    const usuario: any = {
      name: nombre,
      last_name: apellido,
      email: this.editUsuarioForm.value.email,
      phone: this.editUsuarioForm.value.phone,
      fechaActualizacion: new Date(),
      address: direccion
    }

    this._dialogService.confirmDialog({
      title: 'Modificar Usuario',
      message: '¿Está seguro de modificar la información?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this.loading = true;
        this._usuarioService.actualizarUsuario(this.idUsuario!, usuario).then(() => {
          this.loading = false;
          this.toastr.success('El usuario fue modificado con exito', 'Usuario modificado', {
            positionClass: 'toast-bottom-right'
          });
        })
        this.loading = false;
        this.router.navigate(['/admin/ajustes/ajustesUsuarios']);
      }
    });
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUsuarios']);
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.editUsuarioForm.controls;
  }

  get name() {
    return this.editUsuarioForm.get('name');
  }

  get last_name() {
    return this.editUsuarioForm.get('last_name');
  }

  get address() {
    return this.editUsuarioForm.get('address');
  }

  get phone() {
    return this.editUsuarioForm.get('phone');
  }

  get email() {
    return this.editUsuarioForm.get('email');
  }

}
