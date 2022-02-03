import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminI } from "src/app/models/administrador";
import { AuthService } from "src/app/services/auth.service";
import { FirestoreService } from "src/app/services/firestore.service";

@Component({
    selector: 'app-loginAdmin',
    templateUrl: './loginAdmin.component.html',
    styleUrls: ['./loginAdmin.component.css']
})

export class LoginAdminComponent implements OnInit {

    perfilUsuario: string='';

    loginForm = new FormGroup({
        email: new FormControl,
        password: new FormControl
    });

    NavigationExtras: NavigationExtras = {
        state: {
            adminLogged: null
        }
        
    }


    constructor(private authSvc: AuthService,
        private fstore: FirestoreService,
        private router: Router) { }

    ngOnInit() { }


    async onLogin() {
        
        try {
            const { email, password } = this.loginForm.value;

            const res = await this.authSvc.login(email, password).catch(error => {
                console.log('error');
            });

            if (res) {
                //console.log('res -> ', res);
                const uid = res.user.uid;
                this.getDatosUser(res.user.uid);
            } else {
                alert('No autenticado'); 
            }
        } catch (error) {
            return console.log(error);
        }
    }

    comprobarRol(uid: string) {
        const usuario = this.authSvc.getUsuario(uid).subscribe(colUser => {
            //console.log('usuario---', colUser);
            colUser.forEach(element => console.log(element))
        })

    }

    getDatosUser(uid: string) {
        const path = 'admins';
        const id = uid;
        this.fstore.getDoc<AdminI>(path, id).subscribe(res => {
            //console.log('datos1 -> ', res);
            if(res){
                this.perfilUsuario = res.rol;
                this.NavigationExtras.state = res;
                if (this.perfilUsuario=='administrador') {
                    console.log('el usuario tiene permisos');
                    
                    //this.router.navigate(['/admin']);
                } else if(this.perfilUsuario=='usuario') {
                   
                    console.log('El usuario no tiene permisos');
                }
            }
        })
    }

    isValidField(field: string): string {
        const validatedField = this.loginForm.get(field);
        return (!validatedField!.valid && validatedField!.touched)
            ? 'is-invalid' : validatedField!.touched ? 'is-valid' : '';
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