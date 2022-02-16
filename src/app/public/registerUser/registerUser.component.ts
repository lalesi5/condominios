import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioI } from "src/app/models/usuario";
import { AuthService } from "src/app/services/auth.service";
import { FirestoreService } from "src/app/services/firestore.service";
import Validation from "../confirm.validator";

@Component({
    selector: 'app-registerUser',
    templateUrl: './registerUser.component.html',
    styleUrls: ['./registerUser.component.css']
})

export class RegisterUserComponent implements OnInit {

    datos: UsuarioI = {
        address: '',
        email: '',
        last_name: '',
        name: '',
        password: '',
        phone: '',
        rol: '',
        uid: '',
    }

    hide: boolean = true;
    private isEmail = /\S+@\S+\.\S+/;

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

    ngOnInit(): void {
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
    * Metodo para registrar usuario
    * guarda el uid del usuario autenticado como dato
    */
    onRegister() {
        console.log('datos -> ', this.datos);
        console.log('entra al registro');
        const formValue = this.registerForm.value;
        if (this.registerForm.valid) {
            console.log('Datos validos');
            this.authSvc.registerByEmailUser(formValue).then(async (res) => {
                if (res) {
                    console.log('usuario - ', res);
                    const path = 'user';
                    const id = res.user.uid;

                    this.datos.uid = id;
                    this.datos.password = '';
                    this.datos.rol = 'usuario';
                    await this.fstore.createDoc(this.datos, path, id);
                }
                console.log('Usuario registrado');
                //this.authSvc.verificarCorreo();
                //console.log('Correo de verificacion enviado');


                this.authSvc.logout();
                this.router.navigate(['../loginUser']);
            })
        } else {
            console.log('Datos no validos');
        }

        /**const res = await this.authSvc.registerUsuario(this.datos).catch(error => {
            console.log('error');
        })

        if (res) {
            console.log('exito al crear usuario');
            const path = 'user';
            const id = res.user.uid;
            this.datos.userId = id;
            this.datos.password = '';
            this.datos.rol = 'usuario';
            await this.fstore.createDoc(this.datos, path, id);
        }**/
    }

    obtenerUsuarioLogeado() {
        this.authSvc.getUserLogged().subscribe(res => {
            console.log(res?.email);
        });
    }

    onSubmit(): void {
        //this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        } 
        console.log(JSON.stringify(this.registerForm.value, null, 2));
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