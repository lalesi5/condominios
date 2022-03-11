import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ajustes-usuarios-create',
  templateUrl: './ajustes-usuarios-create.component.html',
  styleUrls: ['./ajustes-usuarios-create.component.css']
})
export class AjustesUsuariosCreateComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = ''
  usuarios: any[] = [];
  condominio: any[] = [];

  createUsuarioForm: FormGroup;
  submitted = false;
  loading = false;
  private isEmail = /\S+@\S+\.\S+/;
  hide: boolean = true;

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private fb: FormBuilder,
    private _usuarioService: UsuariosService,
    private toastr: ToastrService
  ) {

    this.createUsuarioForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)]],
      phone: ['', [Validators.pattern(/^\d+$/)]],
      address: [''],
    })

    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  ngOnInit(): void {
  }

  agregarUsuario() {

    this.submitted = true;
    
    const nombre = String(this.createUsuarioForm.value.name).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    const apellido = String(this.createUsuarioForm.value.last_name).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    const direccion = String(this.createUsuarioForm.value.address).charAt(0).toLocaleUpperCase() + String(this.createUsuarioForm.value.address).slice(1);

    const usuario: any = {
      name: nombre,
      last_name: apellido,
      email: this.createUsuarioForm.value.email,
      password: this.createUsuarioForm.value.password,
      phone: this.createUsuarioForm.value.phone,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      rol: 'Usuario',
      idAdministrador: this.idAministrador,
      idCondominio: this.idCondominio,
      address: direccion
    }

    //Crea el usuario
    const formValue = this.createUsuarioForm.value
    this.authSvc.registerByEmailAdmin(formValue).then(async (res) => {
      if (res) {
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
          this.navigationExtras.state = this.condominio;
          this.router.navigate(['/admin/ajustes/ajustesUsuarios'], this.navigationExtras);

        }).catch(error => {
          console.log(error);
          this.loading = false;
        });
      }
    });
    this.createUsuarioForm.reset();
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUsuarios'], this.navigationExtras);
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
