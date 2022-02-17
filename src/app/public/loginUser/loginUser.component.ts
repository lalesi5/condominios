import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioI } from 'src/app/models/usuario';
import { AuthService } from "src/app/services/auth.service";
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
    selector: 'app-loginUser',
    templateUrl: './loginUser.component.html',
    styleUrls: ['./loginuser.component.css']
})

export class LoginUserComponent implements OnInit {

    private isEmail = /\S+@\S+\.\S+/;
    verifyEmail: boolean = false;
    rol: string = '';
    hide: boolean = true;

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
        password: ['', Validators.required],
    });

    constructor(private authSvc: AuthService,
        private afAuth: AngularFireAuth,
        private fstore: FirestoreService,
        private router: Router,
        private fb: FormBuilder) {
        afAuth.authState.subscribe(user => {
            console.log(user);

        })
    }

    ngOnInit() { }

    onLogin(): void {

        const formValue = this.loginForm.value;
        if (this.loginForm.valid) {
            console.log('Datos validos');
            this.authSvc.loginByEmailUser(formValue).then((res) => {
                if (res) {
                    //console.log('usuario - ', res);
                    this.comprobarVerificacionEmail();
                const uid = res?.user.uid;
                this.comprobarRol(uid);
                    //this.router.navigate(['/user/home']);
                }
            })
        } else {
            //console.log('Datos no validos');
        }
    }

    comprobarVerificacionEmail() {
        this.authSvc.getCurrentUser().subscribe((user => {
            if (user?.emailVerified == true) {
                //console.log('Si esta verificado');
                this.router.navigate(['/user/home']);
            } else {
                //console.log('No esta verificado');
                this.authSvc.logout();
                this.router.navigate(['../loginUser']);
            }
        }))
    }

    comprobarRol(uid: string) {
        const path = 'user';
        const id = uid;
        this.fstore.getDoc<UsuarioI>(path, id).subscribe(res => {
            //console.log('datos1 -> ', res);
            if (res) {
                this.rol = res.rol;
                if (this.rol === 'usuario') {
                    console.log('el usuario tiene permisos');

                    this.router.navigate(['/user']);
                } else {
                    console.log('El usuario no tiene permisos');
                    this.authSvc.logout();
                    this.router.navigate(['../loginUser']);
                }
            }
        })
    }

    //Mostrar y ocular contraseña
    showPassword() {
        this.hide = !this.hide;
    }

    obtenerUsuarioLogeado() {
        this.authSvc.getUserLogged().subscribe(res => {
            //console.log(res?.email);
        });
    }

    get form(): { [key: string]: AbstractControl; } {
        return this.loginForm.controls;
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

}