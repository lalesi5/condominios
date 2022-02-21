import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AdminI } from "src/app/models/administrador";
import { AuthService } from "src/app/services/auth.service";
import { FirestoreService } from "src/app/services/firestore.service";

@Component({
    selector: 'app-loginAdmin',
    templateUrl: './loginAdmin.component.html',
    styleUrls: ['./loginAdmin.component.css']
})

export class LoginAdminComponent implements OnInit, OnDestroy {

    private subscription: Subscription = new Subscription;
    private isEmail = /\S+@\S+\.\S+/;
    verifyEmail: boolean = false;
    rolUser: string | undefined;
    hide: boolean = true;
    perfilUsuario: string = '';

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
        password: ['', Validators.required],
    });

    NavigationExtras: NavigationExtras = {
        state: {

        }
    }

    constructor(private authSvc: AuthService,
        private fstore: FirestoreService,
        private fb: FormBuilder,
        private router: Router) { }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngOnInit() { }


    onLogin() {
        const formValue = this.loginForm.value;

        this.authSvc.loginByEmailAdmin(formValue).then((res) => {
            if (res) {
                const uid = res.user.uid;
                this.getDatosUser(uid);
            } else {
                alert('Usuario autenticado');
            }
        })
    }

    getDatosUser(uid: string) {
        const path = 'Administrador';
        const id = uid;
        this.subscription.add(
            this.fstore.getDoc<AdminI>(path, id).subscribe(res => {
                this.rolUser = res?.rol;

                if (this.rolUser === 'administrador') {
                    this.NavigationExtras.state = res;
                    this.router.navigate(['/selectCondominio'], this.NavigationExtras);
                    console.log('Dato enviado', this.NavigationExtras);
                }
                else if (this.rolUser === 'user') {
                    this.router.navigate(['/user/home']);
                }
                else if (this.rolUser == 'admin-user') {
                    alert('El usuario tiene ambos roles')
                }

            })
        )

    }

    showPassword() {
        this.hide = !this.hide;
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