import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { UsuarioI } from 'src/app/models/usuario';
import { AuthService } from "src/app/services/auth.service";
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
    selector: 'app-loginUser',
    templateUrl: './loginUser.component.html',
    styleUrls: ['./loginuser.component.css']
})

export class LoginUserComponent implements OnInit {

    private subscription: Subscription = new Subscription;
    private isEmail = /\S+@\S+\.\S+/;
    verifyEmail: boolean = false;
    hide: boolean = true;
    rolUser: string | undefined;

    NavigationExtras: NavigationExtras = {
        state: {
        }
    }

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
                    //this.comprobarVerificacionEmail();
                    //this.comprobarRol(uid);
                    //this.router.navigate(['/user/home']);
                    const uid = res.user.uid;
                    this.getDatosUser(uid);
                } else {
                    alert('Usuario no autenticado');
                }
            })
        } else {
            //console.log('Datos no validos');
        }
    }

    getDatosUser(uid: string) {
        const path = 'Administrador';
        const id = uid;
        this.subscription.add(
            this.fstore.getDoc<UsuarioI>(path, id).subscribe(res => {
                this.rolUser = res?.rol;

                if (this.rolUser === 'administrador') {
                    this.NavigationExtras.state = res;
                    this.router.navigate(['/selectCondominio'], this.NavigationExtras);
                    console.log('Dato enviado', this.NavigationExtras);
                }
                else if (this.rolUser === 'user') {
                    this.NavigationExtras.state = res;
                    this.router.navigate(['/selectRol'], this.NavigationExtras)
                    //this.router.navigate(['/user/home']);
                }
                else if (this.rolUser == 'admin-user') {
                    alert('El usuario tiene ambos roles')
                }
            })
        )
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