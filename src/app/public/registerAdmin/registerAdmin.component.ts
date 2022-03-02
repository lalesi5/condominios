import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminI } from "src/app/models/administrador";
import { AuthService } from "src/app/services/auth.service";
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
    }

    private isEmail = /\S+@\S+\.\S+/;
    hide: boolean = true;

    registerForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        last_name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl('')
    });

    constructor(private authSvc: AuthService,
        private fstore: FirestoreService,
        private router: Router,
        private fb: FormBuilder) { }

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
        console.log('datos -> ', this.datos);
        console.log('entra al registro');
        const formValue = this.registerForm.value;
        if (this.registerForm.valid) {
            console.log('Datos validos');
            this.authSvc.registerByEmailAdmin(formValue).then(async (res) => {
                if (res) {
                    console.log('usuario - ', res);
                    const path = 'Administrador';
                    const id = res.user.uid;
                    this.datos.idAdministrador = id;
                    this.datos.password = '';
                    this.datos.rol = 'administrador';
                    await this.fstore.createDoc(this.datos, path, id);
                }
                console.log('Usuario registrado');
                //this.authSvc.verificarCorreo();
                //console.log('Correo de verificacion enviado');

                this.authSvc.logout();
                this.router.navigate(['../loginAdmin']);
            })
        } else {
            console.log('Datos no validos');
        }
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