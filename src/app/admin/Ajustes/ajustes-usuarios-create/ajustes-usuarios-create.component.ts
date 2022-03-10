import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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


  usuariosForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl('')
  });

  navigationExtras: NavigationExtras = {
    state: {
    }
  }

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private authSvc: AuthService,
    private fb: FormBuilder,
    private _usuarioService: UsuariosService,
    private toastr: ToastrService
  ) {

    this.createUsuarioForm = this.fb.group({
      name: ['', Validators.required],
      last_name: [''],
      email: [''],
      password: [''],
      phone: ['']
    })

    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
  }

  ngOnInit(): void {
  }

  agregarUsuario() {
    
    this.submitted = true;
    const usuario: any = {
      name: this.createUsuarioForm.value.name,
      last_name: this.createUsuarioForm.value.last_name,
      email: this.createUsuarioForm.value.email,
      password: this.createUsuarioForm.value.password,
      phone: this.createUsuarioForm.value.phone,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      rol: 'Usuario',
      idAdministrador: this.idAministrador,
      idCondominio: this.idCondominio,
      addres: ''
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
          //this.router.navigate(['/admin/ajustes/ajustesUsuarios'], this.navigationExtras);

        }).catch(error => {
          console.log(error);
          this.loading = false;
        });
      }
    });
    this.createUsuarioForm.reset();
  }

  onBacktoList(): void {
    this.navigationExtras.state = this.condominio;
    this.router.navigate(['/admin/ajustes/ajustesUsuarios'], this.navigationExtras);
  }

  onCreateUsuarios() {
    this.navigationExtras.state = this.condominio;


    this.crearUsuarios(this.usuariosForm.value, this.idAministrador, this.idCondominio);
    this.router.navigate(['/admin/ajustes/ajustesUsuarios'], this.navigationExtras);
    //this._unidadesService.saveUnidades(this.unidadesForm.value, this.idAministrador, this.idCondominio);
  }

  crearUsuarios(usuario: any, idAdmin: string, idCondo: string) {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const formValue = this.usuariosForm.value;

    this.authSvc.registerByEmailAdmin(formValue).then(async (res) => {
      if (res) {
        console.log('usuario - ', res);
        const path = 'Administrador';
        const idUsuario = res.user.uid;
        const rol = 'user';
        const address = '';
        const data = { idAdministrador, idCondominio, idUsuario, rol, address, ...usuario }
        await this.firestoreService.createDoc(data, path, idUsuario).then(() => this.usuariosForm.reset());
      }
      alert('usuario creado');
    })
  }

}
