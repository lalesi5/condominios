import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
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
    })


    constructor(private authSvc: AuthService,
        private fstore: FirestoreService,
        private router: Router) { }

    ngOnInit() { }

    /**async onlogin(){

        console.log('datos -> ', this.datos);
        const { email, password } = this.loginForm.value;
        const res = await this.authSvc.loginAdmin(this.datos).catch(error => {
            console.log('error');
        })
    }**/

    async onLogin() {
        //console.log('Form->', this.loginForm.value);
        try {
            const { email, password } = this.loginForm.value;

            const res = await this.authSvc.login(email, password).catch(error => {
                console.log('error');
            });

            if (res) {
                console.log('res -> ', res);
                const uid = res.user.uid;
                //this.comprobarRol(uid);
                this.getDatosUser(res.user.uid);
                
            } else {
                console.log('No autenticado');
                //swift alert revisar
            }
        } catch (error) {
            return console.log(error);
        }
    }
    //this.prueba();

    comprobarRol(uid: string) {
        const usuario = this.authSvc.getUsuario(uid).subscribe(colUser => {
            console.log('usuario---', colUser);
            colUser.forEach(element => console.log(element))
        })

    }

    getDatosUser(uid: string) {
        const path = 'admins';
        const id = uid;
        this.fstore.getDoc<AdminI>(path, id).subscribe(res => {
            console.log('datos1 -> ', res);
            if(res){
                this.perfilUsuario = res.rol;
                if (this.perfilUsuario=='administrador') {
                    this.router.navigate(['/admin']);
                } else {
                   
                    console.log('El usuario no tiene permisos');
                }
            }
        })
    }
}