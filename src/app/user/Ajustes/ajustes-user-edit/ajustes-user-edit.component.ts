import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Validation from 'src/app/public/confirm.validator';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-ajustes-user-edit',
  templateUrl: './ajustes-user-edit.component.html',
  styleUrls: ['./ajustes-user-edit.component.css']
})
export class AjustesUserEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  private isEmail = /\S+@\S+\.\S+/;
  hide: boolean = true;
  unidad: any[] = [];
  administrador: any[] = [];
  user: any;

  idAministrador: string = '';
  idUsuario: string = '';
  emailAministrador: string = '';
  passwordAministrador: string = '';
  rolAministrador: string = '';
  loading = false;
  id: string | null;

  /*Formularios*/
  administradorForm: FormGroup;

  emailForm: FormGroup;

  cambioPasswordForm: FormGroup;

  /*Variables de retorno*/

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _adminService: AdminService,
    private fb: FormBuilder,
    private auth: AuthService,
    private firestoreService: FirestoreService,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.administradorForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.pattern(/^\d+$/)]]
    });

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
    });

    this.cambioPasswordForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
            Validators.pattern(/\d/),
            Validators.pattern(/[A-Z]/),
            Validators.pattern(/[a-z]/)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );

    this.id = aRoute.snapshot.paramMap.get('id');

    this.recoverData();
  }

  ngOnInit(): void {
    this.getDatosAdministrador();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.unidad = navigations;
    this.idAministrador = navigations.idAdministrador;
    this.idUsuario = navigations.idUsuario;
    this.NavigationExtras.state = this.unidad;
  }

  getDatosAdministrador() {
    if (this.id !== null) {
      this.loading = true;
      this.subscription.add(
        this._adminService.getAdministrador(this.id).subscribe(data => {
          this.loading = false;
          this.administradorForm.setValue({
            name: data.payload.data()['name'],
            last_name: data.payload.data()['last_name'],
            address: data.payload.data()['address'],
            phone: data.payload.data()['phone'],
          })
        })
      )
    }
  }

  onEdit() {
    const nombre = String(this.administradorForm.value.name).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    const apellido = String(this.administradorForm.value.last_name).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    const direccion = String(this.administradorForm.value.address).charAt(0).toLocaleUpperCase() + String(this.administradorForm.value.address).slice(1);
    var date = new Date();

    //informaciona guardar en el documento
    const data = {
      name: nombre,
      last_name: apellido,
      address: direccion,
      phone: this.administradorForm.value.phone,
      fechaActualizacion: date.toLocaleString()
    }

    this._dialogService.confirmDialog({
      title: 'Modificar información',
      message: '¿Está seguro de modificar la información?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this.loading = true;
        this._adminService.updateAdministrador(this.idUsuario, data).then(() => {
          this.loading = false;
          this.toastr.success('La información del usuario fue modificada con exito', 'Usuario modificado', {
            positionClass: 'toast-bottom-right'
          });
        })
        this.loading = false;
        this.NavigationExtras.state = this.unidad;
        this.router.navigate(['/user/ajustes'], this.NavigationExtras);
      }
    })
  }

  //Mostrar y ocular contraseña
  showPassword() {
    this.hide = !this.hide;
  }

  onChangePassword() {
    const userAuth = getAuth();
    const contrasenia = this.cambioPasswordForm.value.password;
    var date = new Date();

    const data = {
      password: contrasenia,
      fechaActualizacion: date.toLocaleString()
    }

    this._dialogService.confirmDialog({
      title: 'Cambiar contraseña',
      message: '¿Está seguro de cambiar su contraseña?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this.auth.updatePassword(userAuth.currentUser, contrasenia);
        this.loading = true;
        this._adminService.updateAdministrador(this.idUsuario, data).then(() => {
          this.loading = false;

          this.toastr.success('Su contraseña fue modificada con exito', 'Contraseña cambiada', {
            positionClass: 'toast-bottom-right'
          })

          this.loading = false;
          this.NavigationExtras.state = this.unidad;
          this.router.navigate(['/user/ajustes'], this.NavigationExtras);
        });
      }
    })
  }

  onChangeEmail() {
    const userAuth = getAuth();
    const email = this.emailForm.value.email;

    const data = { email };

    let result = confirm("Esta seguro de modificar su correo electrónico")
    if (result) {
      this.firestoreService.updateDoc(data, 'Administrador', this.idAministrador);
      this.auth.updateEmail(userAuth.currentUser, email);
      alert('Correo electrónico actualizado correctamente');
      this.router.navigate(['/user/ajustes'], this.NavigationExtras);
    }
  }

  onBacktoList(): void {
    this.router.navigate(['/user/ajustes'], this.NavigationExtras);
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.administradorForm.controls;
  }

  get phone() {
    return this.administradorForm.get('phone');
  }

  get formEmail(): { [key: string]: AbstractControl; } {
    return this.emailForm.controls;
  }

  get email() {
    return this.emailForm.get('email');
  }

  get formPassword(): { [key: string]: AbstractControl; } {
    return this.cambioPasswordForm.controls;
  }

  get password() {
    return this.cambioPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.cambioPasswordForm.get('confirmPassword');
  }

}
