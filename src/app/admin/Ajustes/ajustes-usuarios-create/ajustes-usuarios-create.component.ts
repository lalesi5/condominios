import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ajustes-usuarios-create',
  templateUrl: './ajustes-usuarios-create.component.html',
  styleUrls: ['./ajustes-usuarios-create.component.css']
})
export class AjustesUsuariosCreateComponent implements OnInit {

  idAdministrador: string = '';
  idCondominio: string = ''
  usuarios: any[] = [];
  condominio: any[] = [];

  createUsuarioForm: FormGroup;
  loading = false;
  private isEmail = /\S+@\S+\.\S+/;
  hide: boolean = true;

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private fb: FormBuilder,
    private _usuarioService: UsuariosService,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {

    this.createUsuarioForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)]],
      phone: ['', [Validators.pattern(/^.{6,13}$/)]],
      address: [''],
    })
    this.recoverData();
  }

  ngOnInit(): void {
  }

  recoverData() {
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  agregarUsuario() {

    const nombre = String(this.createUsuarioForm.value.name).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    const apellido = String(this.createUsuarioForm.value.last_name).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    const direccion = String(this.createUsuarioForm.value.address).charAt(0).toLocaleUpperCase() + String(this.createUsuarioForm.value.address).slice(1);

    this._dialogService.confirmDialog({
      title: 'Agregar Usuario',
      message: '¿Está seguro de agregar el usuario?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {

        const usuario: any = {
          name: nombre,
          last_name: apellido,
          email: this.createUsuarioForm.value.email,
          password: this.createUsuarioForm.value.password,
          phone: this.createUsuarioForm.value.phone,
          fechaCreacion: new Date(),
          fechaActualizacion: new Date(),
          rol: 'Usuario',
          idAdministrador: this.idAdministrador,
          idCondominio: this.idCondominio,
          address: direccion
        }

        //Crea el usuario en la parte de autenticacion

        const formValue = this.createUsuarioForm.value
        this.authSvc.registerByEmailAdmin(formValue).then(async (res) => {
          if (res) {
            // @ts-ignore
            const idUsuario = res.user.uid;

            const data = { idUsuario, ...usuario }

            //Crea el documento
            this.loading = true;
            this._usuarioService.agregarUsuario(data, idUsuario).then(() => {
              console.log('usuario registrado con exito');
              this.toastr.success('El usuario fue registrado con exito', 'Usuario registrado', {
                positionClass: 'toast-bottom-right'
              });
              this.loading = false;
              this.router.navigate(['/admin/ajustes/ajustesUsuarios']);

            }).catch(error => {
              console.log(error);
              this.loading = false;
            });
          } else {
            this.toastr.error('El correo electrónico utilizado ya se encuentra en uso', 'Error de registro', {
              positionClass: 'toast-bottom-right'
            });
            this.loading = false;
          }
        });
      }
    });
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUsuarios']);
  }

  //Mostrar y ocular contraseña
  showPassword() {
    this.hide = !this.hide;
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.createUsuarioForm.controls;
  }

  get name() {
    return this.createUsuarioForm.get('name');
  }

  get last_name() {
    return this.createUsuarioForm.get('last_name');
  }

  get address() {
    return this.createUsuarioForm.get('address');
  }

  get phone() {
    return this.createUsuarioForm.get('phone');
  }

  get email() {
    return this.createUsuarioForm.get('email');
  }

  get password() {
    return this.createUsuarioForm.get('password');
  }

}
