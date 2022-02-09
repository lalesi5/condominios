import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-loginUser',
    templateUrl: './loginUser.component.html',
    styleUrls: ['./loginuser.component.css']
})

export class LoginUserComponent implements OnInit {

    private isEmail = /\S+@\S+\.\S+/;
    verifyEmail: boolean = false;
    hide: boolean = false;

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
        password: ['', [Validators.required, Validators.minLength(6)/*, Validators.pattern(/\d/), Validators.pattern(/[A-Z]/), Validators.pattern(/[a-z]/)*/]],
    });

    constructor(private authSvc: AuthService,
        private afAuth: AngularFireAuth,
        private router: Router,
        private fb: FormBuilder) {
        afAuth.authState.subscribe(user => {
            console.log(user);

        })
    }

    ngOnInit() { }

    onLogin(): void {
        console.log('entralOGIN');

        const formValue = this.loginForm.value;
        if (this.loginForm.valid) {
            console.log('Datos validos');
            this.authSvc.loginByEmailUser(formValue).then((res) => {
                if (res) {
                    //console.log('usuario - ', res);
                    this.comprobarVerificacionEmail();
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

    isValidField(field: string): string {
        const validatedField = this.loginForm.get(field);
        return (!validatedField!.valid && validatedField!.touched)
            ? 'is-invalid' : validatedField!.touched ? 'is-valid' : '';
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