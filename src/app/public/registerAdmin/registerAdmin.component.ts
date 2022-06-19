import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AdminI } from "src/app/models/administrador";
import { AuthService } from "src/app/services/auth.service";
import { DialogService } from "src/app/services/dialog.service";
import { FirestoreService } from "src/app/services/firestore.service";
import Validation from "../confirm.validator";

@Component({
  selector: 'app-registerAdmin',
  templateUrl: './registerAdmin.component.html',
  styleUrls: ['./registerAdmin.component.css']
})

export class RegisterAdminComponent implements OnInit {

  datos: AdminI = {
    address: '',
    email: '',
    last_name: '',
    name: '',
    password: '',
    phone: '',
    rol: '',
    idAdministrador: '',
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  }

  private isEmail = /\S+@\S+\.\S+/;
  hide: boolean = true;
  loading = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private authSvc: AuthService,
    private _fstore: FirestoreService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
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
  }

  /**
   * Metodo para registro de usuario
   */
  onRegister() {
    const formValue = this.registerForm.value;
    this._dialogService.confirmDialog({
      title: 'Registrar Usuario',
      message: 'Antes de continuar verifique que los datos sean correctos. ¿Está seguro de continuar?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {

        if (this.registerForm.valid) {
          this.loading = true;
          console.log('Datos validos');
          this.authSvc.registerByEmailAdmin(formValue).then(async (res) => {
            if (res) {
              const path = 'Administrador';
              // @ts-ignore
              const idAdministrador = res.user.uid;
              this.datos.idAdministrador = idAdministrador;
              this.datos.password = '';
              this.datos.rol = 'Administrador';
              this.datos.name = String(this.registerForm.value.name).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
              this.datos.last_name = String(this.registerForm.value.last_name).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());

              await this._fstore.createDoc(this.datos, path, idAdministrador).then(() => {
                console.log('usuario registrado con exito');
                this.toastr.success('El usuario fue registrado con exito, por favor revise su correo para verificar su cuenta', 'Usuario registrado', {
                  positionClass: 'toast-bottom-right', timeOut: 10000
                });
                this.loading = false;
              }).catch(error => {
                console.log(error);
                this.loading = false;
              });
              this.authSvc.verificarCorreo();
              //console.log('Correo de verificacion enviado');
              this.authSvc.logout();
              this.router.navigate(['./loginAdmin']);
            } else {
              this.toastr.error('El correo electrónico utilizado ya se encuentra en uso', 'Error de registro', {
                positionClass: 'toast-bottom-right'
              });
              this.loading = false;
            }
          })
        }

      }
    });


  }

  //Mostrar y ocular contraseña
  showPassword() {
    this.hide = !this.hide;
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.registerForm.controls;
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get last_name() {
    return this.registerForm.get('last_name');
  }
}
