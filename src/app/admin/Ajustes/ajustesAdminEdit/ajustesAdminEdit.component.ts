import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, NavigationExtras } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { first, Subscription } from "rxjs";
import Validation from "src/app/public/confirm.validator";
import { AuthService } from "src/app/services/auth.service";
import { getAuth } from "firebase/auth";
import { FirestoreService } from "src/app/services/firestore.service";

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
    private firestoreService: FirestoreService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {

    this.administradorForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]]
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

    let result = confirm("Esta seguro de modificar la información")
    if (result) {
      this._adminService.saveAdministrador(this.administradorForm.value,
        this.idAministrador,
        this.emailAministrador,
        this.passwordAministrador,
        this.rolAministrador);
      alert('Administrador actualizado correctamente');
      this.router.navigate(['/admin'], this.NavigationExtras);
    }
  }

  //Mostrar y ocular contraseña
  showPassword() {
    this.hide = !this.hide;
  }

  onChangePassword() {
    //this.passwordAministrador = this.cambioPasswordForm.value('password');
    const userAuth = getAuth();
    const password = this.cambioPasswordForm.get('password')?.value;
    let result = confirm("Esta seguro de cambiar su contraseña");
    if (result) {
      alert('Contraseña actualizada correctamente');
      this.auth.updatePassword(userAuth.currentUser, password);
      this.router.navigate(['/admin'], this.NavigationExtras);
    }
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
