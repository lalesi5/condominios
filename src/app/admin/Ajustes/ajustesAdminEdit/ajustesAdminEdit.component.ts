import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, NavigationExtras } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { first, Subscription } from "rxjs";
import Validation from "src/app/public/confirm.validator";
import { AuthService } from "src/app/services/auth.service";
import { getAuth } from "firebase/auth";
import { FirestoreService } from "src/app/services/firestore.service";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "src/app/services/dialog.service";

@Component({
  selector: 'app-ajustesAdminEdit',
  templateUrl: './ajustesAdminEdit.component.html',
  styleUrls: ['./ajustesAdminEdit.component.css']
})

export class AjustesAdminEditComponent implements OnInit, OnDestroy {

  /*Variables*/

  private subscription: Subscription = new Subscription;
  private isEmail = /\S+@\S+\.\S+/;
  hide: boolean = true;
  condominio: any[] = [];
  administrador: any[] = [];
  user: any;

  idAministrador: string = '';
  emailAministrador: string = '';
  passwordAministrador: string = '';
  rolAministrador: string = '';
  loading = false;

  /*Formularios*/
  administradorForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    last_name: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl('')
  });

  emailForm = this.fb.group({
    email: new FormControl('')
  })

  cambioPasswordForm: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

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
    private toastr: ToastrService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {

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

    this.onListAdmin();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.condominio = navigations;
    this.idAministrador = navigations.idAdministrador;
    this.NavigationExtras.state = this.condominio;
  }

  onListAdmin() {
    try {
      this.subscription.add(
        this._adminService
          .getAdministradorID(this.idAministrador)
          .subscribe(data => {
            data.forEach((element: any) => {
              this.administrador.push({
                ...element.payload.doc.data()
              })
            })
          })
      );
    } catch (err) {
      console.log(err);
    }
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes'], this.NavigationExtras);
  }

  onCreateAdmin() {

    this.administrador.forEach((element: any) => {
      this.idAministrador = element.idAdministrador;
      this.emailAministrador = element.email;
      this.passwordAministrador = element.password;
      this.rolAministrador = element.rol;
    })

    //nombre
    const nombre = String(this.administradorForm.get('name')?.value);
    //Mayuscula la primera letra de cada palabra
    const name = String(nombre).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
    //apellido
    const apellido = String(this.administradorForm.get('last_name')?.value);
    const last_name = String(apellido).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
    //direccion
    const dir = this.administradorForm.get('address')?.value;
    const address = String(dir).charAt(0).toLocaleUpperCase() + String(dir).slice(1);
    //telefono
    const phone = this.administradorForm.get('phone')?.value;
    //informaciona guardar en el documento
    const data = { name, last_name, address, phone }

    this._dialogService.confirmDialog({
      title: 'Modificar información',
      message: '¿Está seguro de modificar la información?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this.loading = true;
        this._adminService.saveAdministrador(data,
          this.idAministrador,
          this.emailAministrador,
          this.passwordAministrador,
          this.rolAministrador).then(() => {
            this.loading = false;
            this.toastr.success('La información del usuario fue modificada con exito', 'Usuario modificado', {
              positionClass: 'toast-bottom-right'
            });
          })
        this.loading = false;
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin'], this.NavigationExtras);
      }
    })
  }

  //Mostrar y ocular contraseña
  showPassword() {
    this.hide = !this.hide;
  }

  onChangePassword() {
    //this.passwordAministrador = this.cambioPasswordForm.value('password');
    const userAuth = getAuth();
    const password = this.cambioPasswordForm.get('password')?.value;

    this._dialogService.confirmDialog({
      title: 'Cambiar contraseña',
      message: '¿Está seguro de cambiar su contraseña?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this.auth.updatePassword(userAuth.currentUser, password);
        this.toastr.success('Su contraseña fue modificada con exito', 'Contraseña cambiada', {
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/admin'], this.NavigationExtras);
      }
    })
  }

  onChangeEmail() {
    const userAuth = getAuth();
    const email = this.emailForm.get('email')?.value;

    const data = { email };

    console.log('email - ', email);

    this.administrador.forEach((element: any) => {
      this.emailAministrador = element.email;
    })

    let result = confirm("Esta seguro de modificar su correo electrónico")
    if (result) {
      this.firestoreService.updateDoc(data, 'Administrador', this.idAministrador);
      this.auth.updateEmail(userAuth.currentUser, email);
      alert('Correo electrónico actualizado correctamente');
      this.router.navigate(['/admin'], this.NavigationExtras);
    }
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.administradorForm.controls;
  }

  get name() {
    return this.administradorForm.get('name');
  }

  get last_name() {
    return this.administradorForm.get('last_name');
  }

  get address() {
    return this.administradorForm.get('address');
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
