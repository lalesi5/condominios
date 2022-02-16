import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from "@angular/forms";
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

    /*async onLogin() {
        try {
            const { email, password } = this.loginForm.value;

            const res = await this.authSvc.login(email, password).catch(error => {
                console.log('error');
            });

            if (res) {
                //console.log('res -> ', res);
                const uid = res.user.uid;
                this.getDatosUser(uid);
            } else {
                alert('No autenticado');
            }
        } catch (error) {
            return console.log(error);
        }
    }*/

    //Nuevo metodo login
    onLogin(): void {
        const formValue = this.loginForm.value;

        this.authSvc.loginByEmailAdmin(formValue).then((res) => {
            if (res) {
                //console.log('res -> ', res);
                const uid = res.user.uid;
                this.getDatosUser(res.user.uid);
                //this.router.navigate(['/admin']);
            } else {
                alert('No autenticado');
            }
        })

    }

    comprobarRol(uid: string) {
        const usuario = this.authSvc.getUsuario(uid).subscribe(colUser => {
            //console.log('usuario---', colUser);
            colUser.forEach(element => console.log(element))
        })

    }

    getDatosUser(uid: string) {
        const path = 'Administrador';
        const id = uid;
        this.fstore.getDoc<AdminI>(path, id).subscribe(res => {
            //console.log('datos1 -> ', res);
            if (res) {
                this.perfilUsuario = res.rol;
                this.NavigationExtras.state = res;
                if (this.perfilUsuario=='administrador') {
                    //console.log('el usuario tiene permisos');
                    this.router.navigate(['/selectCondominio'], this.NavigationExtras);
                } else if(this.perfilUsuario=='usuario') {
                   
                    alert('El usuario no tiene permisos');
                }
            }
        })
    }

    comprobarVerificacionEmail() {
        this.authSvc.getCurrentUser().subscribe((user => {
            if (user?.emailVerified == true) {
                console.log('Si esta verificado');
                this.router.navigate(['/user/home']);
            } else {
                console.log('No esta verificado');
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
            console.log(res?.email);
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