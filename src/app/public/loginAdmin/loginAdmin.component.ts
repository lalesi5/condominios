import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { AdminI } from "src/app/models/administrador";
import { AuthService } from "src/app/services/auth.service";
import { FirestoreService } from "src/app/services/firestore.service";

@Component({
    selector: 'app-loginAdmin',
    templateUrl: './loginAdmin.component.html',
    styleUrls: ['./loginAdmin.component.css']
})

export class LoginAdminComponent implements OnInit {

    private isEmail = /\S+@\S+\.\S+/;
    verifyEmail: boolean = false;
    rol: string = '';
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
        this.fstore.getDoc<AdminI>(path, id).subscribe(res => {
                this.NavigationExtras.state = res;
                this.router.navigate(['/selectCondominio'], this.NavigationExtras);
                console.log('Dato enviado', this.NavigationExtras);
        })
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